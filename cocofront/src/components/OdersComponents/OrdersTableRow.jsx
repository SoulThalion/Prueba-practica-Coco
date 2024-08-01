import PropTypes from "prop-types";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import DocumentIcon from "../../icons/DocumentIcon";
import { deleteOrder } from "../../services/project.service";
import { getClientById } from "../../services/clients.service";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";

const OrdersTableRow = ({
  id,
  appointment,
  work,
  hours,
  finish,
  userId,
  shipId,
  observations,
  clientId,
  setEditOrderData,
  setEditButton,
  editButton,
  deleteButton,
  setDeleteButton,
  view,
  setView,
  setDocument,
}) => {

  const { user } = useContext(UserContext);
  const [formattedDate, setFormattedDate] = useState("");
  const [client, setClient] = useState({});
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fechaFormateada = formatDate(appointment);
    setFormattedDate(fechaFormateada);
    const fetchClient = async () => {
      const data = await getClientById(clientId);
      setClient(data);
    };

    fetchClient();

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Considerando una anchura de 768px para determinar vista de móvil
    };

    handleResize(); // Verificar tamaño inicial
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño
    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el listener al desmontar el componente
    };
  }, [editButton]);

  const handleClick = () => {
    setView(!view);
    setDocument({
      id: id,
      appointment: appointment,
      work: work,
      hours: hours,
      finish: finish,
      userId: userId,
      shipId: shipId,
      observations: observations,
      clientId: clientId,
    });
  };

  // Función para formatear la fecha y hora en UTC
  const formatDate = (dateString) => {
    // Verificar si la cadena de fecha está vacía
    if (!dateString) {
      return null; // o puedes devolver una cadena vacía: return "";
    }

    // Continuar formateando la fecha si la cadena no está vacía
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    // Omitir los segundos
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
};

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      // Muestra el toast de confirmación
      const confirmation = await new Promise((resolve) => {
        // Resuelve la promesa con true cuando se pulsa Aceptar
        const handleConfirm = () => {
          resolve(true);
          toast.dismiss(); // Cierra el toast al confirmar
          toast.success("Orden eliminada");
        };
        // Resuelve la promesa con false cuando se pulsa Cancelar
        const handleCancel = () => {
          resolve(false);
          toast.dismiss(); // Cierra el toast al cancelar
        };

        // Muestra el toast con los botones
        toast(
          (t) => (
            <div className="text-center">
              <p className="text-lg">
                ¿Estás seguro de que deseas eliminar esta orden?
              </p>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleConfirm}
                  className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  Aceptar
                </button>
                <button
                  onClick={handleCancel}
                  className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ),
          {
            // Configuración adicional del toast
            duration: Infinity, // Duración corta para que desaparezca rápidamente después de confirmar o cancelar
            icon: false, // Para hacer invisible el toast
            dismissOnHover: true, // Para que el toast se cierre cuando el puntero esté encima
          }
        );
      });

      // Si el usuario confirma la eliminación
      if (confirmation) {
        try {
          const update = await deleteOrder(id);

          setDeleteButton(!deleteButton);

          // Realizar cualquier otra acción necesaria después de eliminar la orden
          console.log("Orden eliminada:", update);

          // Limpiar el formulario u otras acciones después de eliminar la orden
        } catch (error) {
          console.error("Error al eliminar la orden:", error);
          // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
        }
      } else {
        // Si el usuario cancela, no hacemos nada
        return;
      }
    } catch (error) {
      console.error("Error al mostrar la confirmación:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <>
      {isMobileView ? (
        <>
          <td className="px-6 py-4 text-xl border border-[#58aaae] space-y-3">
            {client.name} {client.surName}
            <p className="pt-3">{client.address}</p>
            <p>{client.telephone}</p>
            <p>{formattedDate}</p>
          </td>

          <td className="border border-[#58aaae] w-10">
            <button
              className="px-4 py-4 mx-4 mt-2 bg-[#242529] rounded-lg border border-[#58aaae]"
              onClick={handleClick}
            >
              <DocumentIcon />
            </button>
            <div className="pt-2">
              <button
                className="px-4 py-4 mx-4 mb-2 bg-[#242529] rounded-lg border border-[#58aaae]"
                onClick={() => {
                  setEditOrderData({
                    id: id,
                    appointment: appointment,
                    work: work,
                    hours: hours,
                    userId: userId,
                    shipId: shipId,
                    clientId: clientId,
                    observations: observations,
                    finish: finish,
                  });
                  setEditButton(!editButton);
                }}
              >
                <EditIcon />
              </button>
            </div>
          </td>
        </>
      ) : (
        <>
          {user?.role === "admin" || user?.role === "manager" ? (
            <>
              <th
                scope="row"
                className="px-6 py-4 font-medium whitespace-nowrap"
              >
                {id}
              </th>
              <td className="px-6 py-4">{clientId}</td>
              <td className="px-6 py-4">{shipId}</td>
              <td className="px-6 py-4">{formattedDate}</td>
              <td className="px-6 py-4 max-w-xs">
                <div className="max-h-5 overflow-y-auto">{work}</div>
              </td>
              <td className="px-6 py-4">{hours}</td>
              <td className="px-6 py-4">
                {finish ? "Finalizado" : "Pendiente"}
              </td>
              <td className="px-6 py-4">{userId}</td>
              <td className="px-6 py-4 max-w-[250px]">
                <div className="max-h-5 overflow-y-auto">{observations}</div>
              </td>
              <td>
                <button
                  className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
                  onClick={handleClick}
                >
                  <DocumentIcon />
                </button>
              </td>
              <td>
                <button
                  className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
                  onClick={() => {
                    setEditOrderData({
                      id: id,
                      appointment: appointment,
                      work: work,
                      hours: hours,
                      userId: userId,
                      shipId: shipId,
                      clientId: clientId,
                      observations: observations,
                      finish: finish,
                    });
                    setEditButton(!editButton);
                  }}
                >
                  <EditIcon />
                </button>
              </td>
              <td>
                <button
                  className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
                  onClick={handleDelete}
                >
                  <DeleteIcon />
                </button>
              </td>
            </>
          ) : (
            <>
              <td className="px-6 py-4">
                {client.name} {client.surName}
              </td>
              <td className="px-6 py-4">{client.address}</td>
              <td className="px-6 py-4">{client.telephone}</td>
              <td className="px-6 py-4">{formattedDate}</td>
              <td className="px-6 py-4">{hours}</td>
              <td>
                <button
                  className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
                  onClick={handleClick}
                >
                  <DocumentIcon />
                </button>
              </td>
              <td>
                <button
                  className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
                  onClick={() => {
                    setEditOrderData({
                      id: id,
                      appointment: appointment,
                      work: work,
                      hours: hours,
                      userId: userId,
                      shipId: shipId,
                      clientId: clientId,
                      observations: observations,
                      finish: finish,
                    });
                    setEditButton(!editButton);
                  }}
                >
                  <EditIcon />
                </button>
              </td>
            </>
          )}
        </>
      )}
    </>
  );
};

OrdersTableRow.propTypes = {
  id: PropTypes.number,
  finish: PropTypes.bool,
  appointment: PropTypes.string,
  work: PropTypes.string,
  hours: PropTypes.number,
  userId: PropTypes.number,
  shipId: PropTypes.number,
  observations: PropTypes.string,
  clientId: PropTypes.number,
  view: PropTypes.bool,
  setView: PropTypes.func,
  setDocument: PropTypes.func,
  setEditOrderData: PropTypes.func,
  setEditButton: PropTypes.func,
  editButton: PropTypes.bool,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default OrdersTableRow;
