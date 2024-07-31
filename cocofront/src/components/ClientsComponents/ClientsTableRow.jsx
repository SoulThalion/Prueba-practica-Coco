import PropTypes from "prop-types";
import EditIcon from "../../icons/EditIcon";
import DeleteIcon from "../../icons/DeleteIcon";
import { deleteClient } from "../../services/clients.service";
import toast from "react-hot-toast";

const ClientsTableRow = ({
  id,
  name,
  surName,
  address,
  telephone,
  email,
  cif,
  setEditClientData,
  setEditButton,
  editButton,
  deleteButton,
  setDeleteButton,
}) => {

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      // Muestra el toast de confirmación
      const confirmation = await new Promise((resolve) => {
        // Resuelve la promesa con true cuando se pulsa Aceptar
        const handleConfirm = () => {
          resolve(true);
          toast.dismiss(); // Cierra el toast al confirmar
          toast.success('Usuario eliminado')
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
                ¿Estás seguro de que deseas eliminar este usuario?
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
          const update = await deleteClient(id);

          setDeleteButton(!deleteButton);

          // Realizar cualquier otra acción necesaria después de eliminar el usuario
          console.log("Usuario eliminado:", update);

          // Limpiar el formulario u otras acciones después de eliminar el usuario
        } catch (error) {
          console.error("Error al eliminar el usuario:", error);
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
      <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
        {id}
      </th>
      <td className="px-6 py-4">{name}</td>
      <td className="px-6 py-4">{surName}</td>
      <td className="px-6 py-4">{address}</td>
      <td className="px-6 py-4">{telephone}</td>
      <td className="px-6 py-4">{email}</td>
      <td className="px-6 py-4">{cif}</td>
      <td>
        <button
          className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
          onClick={() => {
            setEditClientData({
              id: id,
              address: address,
              name: name,
              surName: surName,
              telephone: telephone,
              email: email,
              cif: cif,
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
  );
};

ClientsTableRow.propTypes = {
  id: PropTypes.number,
  address: PropTypes.string,
  name: PropTypes.string,
  surName: PropTypes.string,
  telephone: PropTypes.string,
  email: PropTypes.string,
  cif: PropTypes.string,
  setEditClientData: PropTypes.func,
  setEditButton: PropTypes.func,
  editButton: PropTypes.bool,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default ClientsTableRow;
