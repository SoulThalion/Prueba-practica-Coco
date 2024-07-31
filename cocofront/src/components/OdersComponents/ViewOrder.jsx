import PropTypes from "prop-types";
import { getClientById } from "../../services/clients.service";
import { useEffect, useState } from "react";
import { getShipById } from "../../services/ship.service";
import { getUserById } from "../../services/users.service";
import XIcon from "../../icons/XIcon";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const ViewOrder = ({ view, setView, document }) => {
  const [client, setClient] = useState({});
  const [ship, setShip] = useState({});
  const [mechanic, setMechanic] = useState({});
  const [formattedDate, setFormattedDate] = useState("");
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchClient = async () => {
      const data = await getClientById(document.clientId);
      setClient(data);
    };

    const fetchShip = async () => {
      const data = await getShipById(document.shipId);
      setShip(data);
    };

    const fetchMechanic = async () => {
      try {
        const data = await getUserById(document.userId);
        setMechanic(data);
      } catch (error) {
        console.error("Error al obtener el mecánico:", error);
        setMechanic(null);
      }
    };

    const fechaFormateada = formatDate(document.appointment);
    setFormattedDate(fechaFormateada);

    fetchMechanic();
    fetchClient();
    fetchShip();
  }, []);

  const handleClick = () => {
    setView(!view);
  };

  const formatDate = (dateString) => {
    // Verificar si la cadena de fecha está vacía
    if (!dateString) {
      return null; // o puedes devolver una cadena vacía: return "";
    }

    // Continuar formateando la fecha si la cadena no está vacía
    const date = new Date(dateString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear();
    const hours = String(date.getUTCHours()).padStart(2, "0");
    const minutes = String(date.getUTCMinutes()).padStart(2, "0");
    // Omitir los segundos
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
};


  return (
    <div>
      <div className="flex flex-col justify-start items-center h-screen w-screen lg:pt-0 text-xl lg:text-lg overflow-y-auto">
        <div className="w-full max-w-xl rounded-lg px-5 pb-5 border border-[#58aaae] bg-[#242529]">
          <div className="grid grid-cols-2 grid-rows-2">
            <p className="row-start-2 col-start-1">
              <span className="text-white text-xl font-bold">Estado: </span>{" "}
              {document.finish ? "Finalizado" : "Pendiente"}
            </p>
            <button
              className="justify-self-end row-start-2 lg:row-start-1 col-start-2 mt-2"
              onClick={handleClick}
            >
              <XIcon />
            </button>
          </div>

          <div className="grid grid-cols-2 rounded-tl-lg rounded-tr-lg lg:grid-rows-[15px] gap-0 bg-[#21212d] border-x border-t border-[#58aaae] p-5">
            <h1 className="col-start-1 row-start-1 text-white text-lg font-bold">
              Datos de Cliente:
            </h1>
            <div className="col-start-2 row-start-1 text-white justify-self-end">
              {document.id}
            </div></div>
            <div className="lg:grid lg:grid-cols-2 rounded-bl-lg rounded-br-lg lg:grid-rows-[15px] gap-5 bg-[#21212d] border-x border-b border-[#58aaae] lg:p-5 px-5 pb-5">
            <p className="lg:col-start-1 lg:row-start-2 text-white lg:pb-0 pb-1">
              <span className="font-bold">Nombre:</span> {client.name}{" "}
              {client.surName}
            </p>
            <p className="lg:pb-0 pb-1">
              <span className="font-bold">CIF:</span> {client.cif}
            </p>

            <p className="lg:pb-0 pb-1">
              <span className="font-bold">Teléfono:</span> {client.telephone}
            </p>
            <p className="lg:col-start-2 lg:row-start-2 text-white lg:pb-0 pb-1">
              <span className="font-bold">Dirección:</span> {client.address}
            </p>
            <p>
              <span className="font-bold">Email:</span> {client.email}
            </p>
          </div>

          <div className="grid grid-cols-3 rounded-tl-lg rounded-tr-lg grid-rows-[15px] gap-5 bg-[#21212d] border-x border-t border-[#58aaae] mt-5 p-5">
            <h1 className="col-start-1 row-start-1 text-white text-lg font-bold">
              Barco:
            </h1>
            <div className="col-start-3 lg:row-start-1 text-white justify-self-end">
              {document.shipId}
            </div></div>
            <div className="lg:grid lg:grid-cols-3 rounded-bl-lg rounded-br-lg grid-rows-[15px] gap-5 bg-[#21212d] border-x border-b border-[#58aaae] px-5 pb-5">
            <p className="lg:col-start-1 lg:row-start-2 text-white mb-2 lg:mb-0">
              <span className="font-bold">Marca:</span> {ship.brand}{" "}
            </p>
            <p className="lg:col-start-2 lg:row-start-2 text-white mb-2 lg:mb-0">
              <span className="font-bold">Modelo:</span> {ship.model}
            </p>
            <p className="lg:col-start-3 lg:row-start-2 text-white">
              <span className="font-bold">Matricula:</span>{" "}
              {ship.registration_number}
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-2 rounded-lg gap-5 bg-[#21212d] border border-[#58aaae] mt-5 p-5">
            <div className="rounded-lg bg-[#21212d] border border-[#58aaae] p-5 mb-5 lg:mb-0">
              <h1 className=" text-white text-lg font-bold mb-2 lg:mb-0">
                Trabajo a realizar:
              </h1>
              <p className=" text-white">{document.work}</p>
            </div>

            <div className="rounded-lg bg-[#21212d] border border-[#58aaae] p-5 mb-5 lg:mb-0">
              <h1 className=" text-white text-lg font-bold mb-2 lg:mb-0">Observaciones:</h1>
              <p className=" text-white">{document.observations}</p>
            </div>
            {user.role === "mechanic" ? (
              <>
                <p className="col-start-1 row-start-2 text-white">
                  <p className="font-bold">Mecánico asignado:</p>{" "}
                  {user.name} {user.surName}
                </p>
                <p className="col-start-2 row-start-2 text-white col-span-2">
                  <p className="font-bold">Cita:</p> {formattedDate}{" "}
                  <p>
                    <span className="font-bold">Horas: </span>
                    {document.hours}
                  </p>
                </p>
              </>
            ) : (
              <><p className="col-start-1 row-start-2 text-white">
                  <p className="font-bold">Mecánico asignado:</p>{" "}
                  {mechanic!== null?  (`${mechanic.name} ${mechanic.surName}`) : " "}
                </p>
                <p className="lg:col-start-2 lg:row-start-2 text-white mb-2 lg:mb-0">
                  <p className="font-bold">Cita:</p> {formattedDate}
                </p>

                <p className="lg:col-start-2 lg:row-start-3 text-white mt-2 lg:mt-0">
                  <p className="font-bold">Horas:</p> {document.hours}
                </p>

                
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

ViewOrder.propTypes = {
  view: PropTypes.bool,
  setView: PropTypes.func,
  document: PropTypes.object,
};

export default ViewOrder;
