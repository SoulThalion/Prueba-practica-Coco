import PropTypes from "prop-types";
import { updateClient } from "../../services/clients.service";
import { getShipsByClientId } from "../../services/ship.service";
import { useEffect, useState } from "react";
import ShipsTable from "../ShipsComponents/ShipsTable";
import NewShip from "../ShipsComponents/NewShip";
import toast from "react-hot-toast";

const EditClient = ({ editClientData, editButton, setEditButton }) => {

  const [ships, setShips] = useState([]);
  const [newButton, setNewButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);

  useEffect(() => {
    const fetchAllShips = async () => {
      const data = await getShipsByClientId(editClientData.id);
      setShips(data);
    };

    fetchAllShips();
  }, [deleteButton, newButton]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const id = editClientData.id;
    const address = event.target.address.value;
    const name = event.target.name.value;
    const surName = event.target.surName.value;
    const telephone = event.target.telephone.value;
    const email = event.target.email.value;
    const cif = event.target.cif.value;

    try {
      const update = await updateClient(
        id,
        address,
        name,
        surName,
        telephone,
        email,
        cif
      );

      toast.success('Usuario editado')
      setEditButton(!editButton);
      console.log("Usuario editado:", update);

      // Limpiar el formulario o realizar otras acciones después de crear el usuario
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      
      <form
        className="w-full max-w-2xl rounded-lg pl-5 pr-5 pb-5 border border-[#58aaae] bg-[#242529]"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-2 grid-rows-[5px] gap-0 lg:mt-3 pl-5">
            <div className="col-start-3 row-start-1">
              <p>{editClientData.id}</p>
            </div>
          <div className="col-start-1 row-start-2 mr-5">
          <div className="mb-4">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-white"
            >
              Dirección
            </label>
            <input
              type="text"
              id="address"
              defaultValue={editClientData.address}
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="dirección"
              required
            />
          </div>

          

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-white"
            >
              Nombre
            </label>
            <input
              type="text"
              id="name"
              defaultValue={editClientData.name}
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="nombre"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="surName"
              className="block mb-2 text-sm font-medium text-white"
            >
              Apellidos
            </label>
            <input
              type="text"
              id="surName"
              defaultValue={editClientData.surName}
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="apellidos"
              required
            />
          </div>
          </div>

          <div className="col-start-2 row-start-2">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              defaultValue={editClientData.email}
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="email"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="telephone"
              className="block mb-2 text-sm font-medium text-white"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telephone"
              defaultValue={editClientData.telephone}
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="teléfono"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="cif"
              className="block mb-2 text-sm font-medium text-white"
            >
              Cif
            </label>
            <input
              type="text"
              id="cif"
              defaultValue={editClientData.cif}
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="cif"
              required
            />
          </div>
        </div>

        </div>

        <div>

          
        </div>
        <NewShip editClientData={editClientData} setNewButton={setNewButton} newButton={newButton}/>
        <ShipsTable
          ships={ships}
          deleteButton={deleteButton}
          setDeleteButton={setDeleteButton}
        />

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 md:gap-14 pt-5 mt-5  border-t border-[#58aaae]">
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
        </div>
      </form>

    </div>
  );
};

EditClient.propTypes = {
  users: PropTypes.array,
  editClientData: PropTypes.array,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
};

export default EditClient;
