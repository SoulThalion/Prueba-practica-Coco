import PropTypes from "prop-types";
import { createShip } from "../../services/ship.service";
import PlusIcon from "../../icons/PlusIcon";
import { useState } from "react";
import toast from "react-hot-toast";

const NewShip = ({ setNewButton, newButton, editClientData }) => {
  const [model, setModel] = useState("");
  const [brand, setBrand] = useState("");
  const [reg, setReg] = useState("");

  const handleNewSubmit = async (event) => {
    event.preventDefault();
    if (model != "" && brand != "" && reg != "") {
      try {
        const newShip = await createShip(model, brand, reg, editClientData.id);
        console.log("Barco añadido:", newShip);
        setNewButton(!newButton);
        toast.success('Barco añadido')
        // Limpiar el formulario o realizar otras acciones después de crear el barco
      } catch (error) {
        console.error("Error al crear el barco:", error);
        // Manejar el error, por ejemplo, mostrar un mensaje de error al barco
      }
    }else{
      toast.error("Falta algún dato de el nuevo barco")
    }
  };

  return (
    <div className="relative pb-5">
      <h1>Añadir Barco</h1>
      <form className="w-full rounded-lg p-5 border border-[#58aaae] bg-[#242529]">
        <div className="grid grid-cols-3 grid-rows-[5px] gap-0">
          <button
            type="submit"
            onClick={handleNewSubmit}
            className="col-start-3 row-start-1 col-span-1 justify-self-end"
          >
            <PlusIcon />
          </button>
          <div className="col-start-1 row-start-2 mr-5 col-span-1">
            <div className="mb-0">
              <label
                htmlFor="model"
                className="block mb-2 text-sm font-medium text-white"
              >
                Modelo
              </label>
              <input
                type="text"
                id="model"
                onChange={(e) => setModel(e.target.value)}
                value={model}
                style={{ backgroundColor: "#21212d" }}
                className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="modelo"
                required
              />
            </div>
          </div>

          <div className="col-start-2 row-start-2 mr-5">
            <div className="mb-0">
              <label
                htmlFor="brand"
                className="block mb-2 text-sm font-medium text-white"
              >
                Marca
              </label>
              <input
                type="text"
                id="brand"
                onChange={(e) => setBrand(e.target.value)}
                value={brand}
                style={{ backgroundColor: "#21212d" }}
                className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="marca"
                required
              />
            </div>
          </div>
          <div className="col-start-3 row-start-2 mr-5">
            <div className="mb-0">
              <label
                htmlFor="registration_number"
                className="block mb-2 text-sm font-medium text-white"
              >
                Matrícula
              </label>
              <input
                type="text"
                id="registration_number"
                onChange={(e) => setReg(e.target.value)}
                value={reg}
                style={{ backgroundColor: "#21212d" }}
                className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="matrícula"
                required
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

NewShip.propTypes = {
  users: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
  editClientData: PropTypes.number,
};

export default NewShip;
