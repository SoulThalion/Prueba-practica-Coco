import PropTypes from "prop-types";
import { updateOrder } from "../../services/project.service";
import { useState, useEffect } from "react";
import { getShipsByClientId, getShipById } from "../../services/ship.service";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import toast from "react-hot-toast";
import Datepicker from "tailwind-datepicker-react";
import LeftArrowIcon from "../../icons/LeftArrowIcon";
import RigthArrowIcon from "../../icons/RigthArrowIcon";

const EditOrder = ({
  editOrderData,
  setEditOrderData,
  editButton,
  setEditButton,
}) => {
  const [ships, setShips] = useState([]);
  const [ship, setShip] = useState({});
  const { user } = useContext(UserContext);
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  useEffect(() => {
    const fetchAllShips = async () => {
      const data = await getShipsByClientId(editOrderData.clientId);
      setShips(data);
    };

    const fetchShip = async () => {
      const data = await getShipById(editOrderData.shipId);
      setShip(data);
    };

    const fechaFormateada = editOrderData.appointment
      ? formatDate(editOrderData.appointment)
      : new Date();

    let fecha, hora;
    if (typeof fechaFormateada === "string") {
      [fecha, hora] = fechaFormateada.split(" ");
    } else {
      // Si fechaFormateada es una instancia de Date, obtenemos la fecha y hora actual
      fecha = fechaFormateada.toISOString().split("T")[0];
      hora = "00:00";
    }
    setDate(fecha);
    setTime(hora);

    fetchAllShips();
    fetchShip();
  }, []);

  const handleChangeTime = (e) => {
    setTime(e.target.value);
  };

  const options = {
    title: "Selecciona la fecha",
    autoHide: true,
    todayBtn: false,
    clearBtn: false,
    clearBtnText: "Clear",
    maxDate: new Date("2030-01-01"),
    minDate: new Date("1950-01-01"),
    theme: {
      background: "bg-gray-700",
      todayBtn: "",
      clearBtn: "",
      icons: "",
      text: "text-white hover:text-black",
      disabledText: "bg-grey",
      input:
        "bg-transparent text-white border border-none pt-2.5 text-xl lg:text-sm lg:w-[120px]",
      inputIcon: "",
      selected: "",
    },
    icons: {
      // () => ReactElement | JSX.Element
      prev: () => <LeftArrowIcon />,
      next: () => <RigthArrowIcon />,
    },
    datepickerClassNames: "top-12",
    defaultDate: new Date(formatDateToDDMMYYYY(date)),
    language: "es",
    disabledDates: [],
    weekDays: ["L", "M", "X", "J", "V", "S", "D"],
    datepickerFormat: ["DD,MM,YYYY"],
    inputNameProp: "date",
    inputIdProp: "date",
    inputPlaceholderProp: "Select Date",
    inputDateFormatProp: {
      day: "numeric",
      month: "numeric",
      year: "numeric",
    },
  };

  function formatDateToDDMMYYYY(dateString) {
    const dateParts = dateString.split("/");
    const day = dateParts[0];
    const month = dateParts[1];
    const year = dateParts[2];
    return `${year}-${month}-${day}`;
  }

  const handleChange = (selectedDate) => {
    const fechaFormateada = formatDate(selectedDate);
    const [fecha, hora] = fechaFormateada.split(" ");
    setDate(fecha);
  };
  const handleClose = (state) => {
    setShow(state);
  };

  const formatDate = (dateString) => {
    // Verificar si la cadena de fecha está vacía
    if (!dateString) {
      return null;
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

  const toISO8601 = (dateString) => {
    // Verificar si la cadena de fecha está vacía
    if (!dateString) {
      return ""; // Devolver una cadena vacía
    }

    // Dividir la cadena en partes (día, mes, año, hora, minutos, segundos)
    const parts = dateString.split(/[\s/:\-]/);

    // Crear un nuevo objeto Date con el formato adecuado
    const date = new Date(
      parts[2],
      parts[1] - 1,
      parts[0],
      parts[3],
      parts[4],
      parts[5] ? parts[5] : "00"
    );

    // Verificar si la fecha es válida
    if (isNaN(date.getTime())) {
      return null; // La fecha es inválida, devuelve null
    }

    // Continuar formateando la fecha si es válida
    const isoString = date.toISOString();
    return isoString;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const id = editOrderData.id;
    const cita = `${date} ${time}`;
    const work = event.target.work.value;
    const hours = event.target.hours.value;
    const finish = event.target.finish.value;
    const shipId = event.target.shipId.value || editOrderData.shipId;
    const userId = event.target.userId.value;
    const observations = event.target.observations.value;

    const appointment = toISO8601(cita);
    
    setEditOrderData({
      id,
      appointment,
      work,
      hours,
      finish,
      shipId,
      userId,
      observations,
    });

    try {
      const update = await updateOrder(
        id,
        appointment,
        work,
        hours,
        finish,
        shipId,
        userId,
        observations
      );

      toast.success("Orden editada");
      setEditButton(!editButton);
      console.log("Orden editada:", update);

      // Limpiar el formulario o realizar otras acciones después de crear el usuario
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  const formattedShips = ships.map((ship) => (
    <option key={ship.id} value={ship.id}>
      {ship.id} {ship.brand} {ship.model} {ship.registration_number}
    </option>
  ));

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <form
        className="w-full max-w-md rounded-lg p-5 border border-[#58aaae] bg-[#242529]"
        onSubmit={handleSubmit}
      >
        <div className="grid md:grid-cols-2 md:gap-6">
          <p className="col-start-2 row-start-1 text-white justify-self-end">
            {editOrderData.id}
          </p>
        </div>

        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-0 col-start-1 row-start-1">
            <label
              htmlFor="userId"
              className={`block mb-2 text-sm font-medium text-white ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
            >
              Mecánico
            </label>
            <input
              type="text"
              id="userId"
              defaultValue={editOrderData.userId}
              style={{ backgroundColor: "#21212d" }}
              className={`border border-[#58aaae] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
              readOnly={user.role === "mechanic"}
            />
          </div>

          <div className="pt-5 lg:pt-0">
            <label className="block mb-2 text-xl lg:text-sm font-medium text-white">
              Cita
            </label>
            <div className="grid gap-0 grid-cols-2 bg-[#21212d] rounded-lg border border-[#58aaae] ">
              <div className="col-start-2 row-start-4 justify-self-end">
                <input
                  type="time"
                  id="time"
                  style={{
                    backgroundImage:
                      "linear-gradient(to left, #32323f, transparent)",
                  }}
                  className="bg-transparent rounded-lg border-none leading-none text-white text-xl lg:text-sm p-2.5"
                  min="09:00"
                  max="18:00"
                  defaultValue={time}
                  onChange={handleChangeTime}
                  required
                />
              </div>

              <div className="col-start-1 row-start-4">
                {date && date.length && (
                  <Datepicker
                    options={options}
                    onChange={handleChange}
                    show={show}
                    setShow={handleClose}
                  />
                )}
              </div>
            </div>
          </div>
          <div className="mb-0 col-start-1 row-start-2 col-span-2">
            <label
              htmlFor="work"
              className={`block mb-2 text-sm font-medium text-white ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
            >
              Trabajo a realizar
            </label>
            <textarea
              id="work"
              style={{
                backgroundColor: "#21212d",
                height: "100px",
                resize: "none",
                textAlign: "left",
              }}
              defaultValue={editOrderData.work}
              className={`border border-[#58aaae] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
              required
              readOnly={user.role === "mechanic"}
            />
          </div>

          <div
            className={`col-start-1 row-start-3 col-span-2 ${
              user.role === "mechanic" ? "mb-5" : "mb-0"
            }`}
          >
            <label
              htmlFor="observations"
              className="block mb-2 text-xl lg:text-sm font-medium text-white"
            >
              Observaciones
            </label>
            <textarea
              id="observations"
              style={{
                backgroundColor: "#21212d",
                height: "100px",
                resize: "none",
                textAlign: "left",
              }}
              defaultValue={editOrderData.observations}
              className="border border-[#58aaae] text-white text-ml lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Observaciones"
            />
          </div>

          <div
            className={`${
              user.role === "mechanic"
                ? "col-start-1 row-start-4 col-span-2"
                : "col-start-2 row-start-4"
            }`}
          >
            <label
              htmlFor="hours"
              className="block mb-2 text-xl lg:text-sm font-medium text-white"
            >
              Horas trabajadas
            </label>
            <input
              type="text"
              id="hours"
              defaultValue={editOrderData.hours}
              style={{ backgroundColor: "#21212d" }}
              className="border border-[#58aaae] text-white text-ml lg:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="hours"
              required
            />
          </div>

          <div className="mb-0 col-start-2 row-start-1">
            <label
              htmlFor="finish"
              className={`block mb-2 text-sm font-medium text-white ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
            >
              Estado
            </label>
            <select
              id="finish"
              defaultValue={editOrderData.finish ? "true" : "false"}
              className={`bg-[#21212d] border border-[#58aaae] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
              readOnly={user.role === "mechanic"}
            >
              <option value="true">Finalizado</option>
              <option value="false">Pendiente</option>
            </select>
          </div>

          <div className="mb-0 col-start-1 row-start-5 col-span-2">
            <label
              htmlFor="shipId"
              className={`block mb-2 text-sm font-medium text-white ${
                user.role === "mechanic" ? "hidden" : ""
              }`}
            >
              Barco
            </label>
            <select
              id="shipId"
              defaultValue={editOrderData.shipId}
              className={`bg-[#21212d] border border-[#58aaae] text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ${
                user.role === "mechanic" ? "hidden" : ""
              }`}

              readOnly={user.role === "mechanic"}
            >
              <option value="">
                {ship.id} {ship.brand} {ship.model} {ship.registration_number}
              </option>
              {formattedShips}
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-5">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center"
          >
            Guardar
          </button>

          <button
            type="button"
            onClick={() => setEditButton(!editButton)}
            className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

EditOrder.propTypes = {
  users: PropTypes.array,
  editOrderData: PropTypes.object,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setEditOrderData: PropTypes.func,
};

export default EditOrder;
