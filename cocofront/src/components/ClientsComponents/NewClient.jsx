import PropTypes from "prop-types";
import { createClient } from "../../services/clients.service";
import toast from "react-hot-toast";

const NewClient = ({ setNewButton, newButton }) => {
  const handleSubmit = async (event) => {
    event.preventDefault();

    const address = event.target.address.value;
    const name = event.target.name.value;
    const surName = event.target.surName.value;
    const telephone = event.target.telephone.value;
    const email = event.target.email.value;
    const cif = event.target.cif.value;

    try {
      const newClient = await createClient(
        address,
        name,
        surName,
        telephone,
        email,
        cif
      );
      
      toast.success('Cliente creado')
      setNewButton(!newButton);

      // Limpiar el formulario o realizar otras acciones después de crear el cliente
    } catch (error) {
      console.error("Error al crear el cliente:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al cliente
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen w-screen">
      <form
        className="w-full max-w-md rounded-lg p-5 border border-[#58aaae] bg-[#242529]"
        onSubmit={handleSubmit}
      >
        <div className="mb-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm font-medium text-white"
          >
            Nombre
          </label>
          <input
            type="text"
            id="name"
            style={{ backgroundColor: "#21212d" }}
            className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="nombre"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="surName"
            className="block mb-2 text-sm font-medium text-white"
          >
            Apellidos
          </label>
          <input
            type="text"
            id="surName"
            style={{ backgroundColor: "#21212d" }}
            className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="apellidos"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="address"
            className="block mb-2 text-sm font-medium text-white"
          >
            Dirección
          </label>
          <input
            type="text"
            id="address"
            style={{ backgroundColor: "#21212d" }}
            className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="dirección"
            required
          />
        </div>

        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            type="text"
            id="email"
            style={{ backgroundColor: "#21212d" }}
            className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder="email"
            required
          />
        </div>
        <div className="grid md:grid-cols-2 md:gap-6">
          <div className="mb-0">
            <label
              htmlFor="telephone"
              className="block mb-2 text-sm font-medium text-white"
            >
              Teléfono
            </label>
            <input
              type="text"
              id="telephone"
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="teléfono"
              required
            />
          </div>

          <div className="mb-0">
            <label
              htmlFor="cif"
              className="block mb-2 text-sm font-medium text-white"
            >
              Cif
            </label>
            <input
              type="text"
              id="cif"
              style={{ backgroundColor: "#21212d" }}
              className="border border-gray-300 text-white text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="cif"
              required
            />
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 md:gap-14 pt-5 mt-5  border-t border-[#58aaae]">
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

NewClient.propTypes = {
  users: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
};

export default NewClient;
