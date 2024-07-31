import PropTypes from "prop-types";
import { createOrder } from "../../services/orders.service";
import { useState, useEffect } from "react";
import { getShipsByClientId } from "../../services/ship.service";
import toast from "react-hot-toast";

const NewOrder = ({ setNewButton, newButton }) => {
  const [clientId, setClientId] = useState();
  const [ships, setShips] = useState([]);

  const handleOnChange = (event) => {
    const text = event.target.value;
    setClientId(text);
  };

  useEffect(() => {
    const fetchAllShips = async () => {
      const data = await getShipsByClientId(clientId);
      setShips(data);
    };

    fetchAllShips();
  }, [clientId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const work = event.target.work.value;
    const shipId = event.target.shipId.value;
    const clientId = event.target.clientId.value;

    try {
      await createOrder(work, shipId, clientId);
      toast.success('Orden creada')
      setNewButton(!newButton);

      // Limpiar el formulario o realizar otras acciones después de crear el usuario
    } catch (error) {
      console.error("Error al crear la orden:", error);
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
        <div className="">
          <div className="mb-4">
            <label
              htmlFor="clientId"
              className="block mb-2 text-sm font-medium text-white"
            >
              Id Cliente
            </label>
            <input
              type="text"
              id="clientId"
              style={{ backgroundColor: "#21212d" }}
              onChange={handleOnChange}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Id Cliente"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="text"
              className="block mb-2 text-sm font-medium text-white"
            >
              Id Barco
            </label>
            <div className="relative">
              <span className="inline-flex absolute inset-y-5 end-0 items-center px-3 text-sm text-gray-900 rounded-s-md"></span>
            </div>
            <select
              id="shipId"
              className="bg-[#21212d] border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              required
            >
              {formattedShips}
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlFor="work"
              className="block mb-2 text-sm font-medium text-white"
            >
              Trabajo a realizar
            </label>
            <input
              type="text"
              id="work"
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Trabajo a realizar"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 md:gap-14 pt-5 mt-2 border-t border-[#58aaae]">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center"
            >
              Registrar
            </button>

            <button
              type="button"
              onClick={() => setNewButton(!newButton)}
              className="text-white bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center"
            >
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

NewOrder.propTypes = {
  users: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
};

export default NewOrder;
