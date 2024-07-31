import PropTypes from "prop-types";
import DeleteIcon from "../../icons/DeleteIcon";
import { deleteShip } from "../../services/ship.service";
import { updateShip } from "../../services/ship.service";
import { useState } from "react";
import toast from "react-hot-toast";
import SaveIcon from "../../icons/SaveIcon";

const ShipsTableRow = ({
  id,
  brand,
  model,
  registration_number,
  deleteButton,
  setDeleteButton,
}) => {
  const [newBrand, setBrand] = useState(brand);
  const [newModel, setModel] = useState(model);
  const [newRegistration_number, setRegistrationNumber] =
    useState(registration_number);
  
  const handleEdit = async (event) => {
    event.preventDefault();
  
    try {
      // Muestra el toast de confirmación
      const confirmation = await new Promise((resolve) => {
        // Resuelve la promesa con true cuando se pulsa Aceptar
        const handleConfirm = () => {
          resolve(true);
          toast.dismiss(); // Cierra el toast al confirmar
          toast.success('Barco editado'); // Muestra un toast de éxito al editar el barco
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
                ¿Seguro que quiere editar los datos del barco?
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
            duration: Infinity, // Duración indefinida para que el toast permanezca visible hasta que el usuario interactúe
            icon: false, // Para hacer invisible el toast
            dismissOnHover: true // Para que el toast se cierre cuando el puntero esté encima
          }
        );
      });
  
      // Si el usuario confirma la edición
      if (confirmation) {
        try {
          const update = await updateShip(
            id,
            newModel,
            newBrand,
            newRegistration_number
          );
          console.log("Barco editado:", update);
        } catch (error) {
          console.error("Error al editar el barco:", error);
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

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      // Muestra el toast de confirmación
      const confirmation = await new Promise((resolve) => {
        // Resuelve la promesa con true cuando se pulsa Aceptar
        const handleConfirm = () => {
          resolve(true);
          toast.dismiss(); // Cierra el toast al confirmar
          toast.success('Barco eliminado')
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
                ¿Estás seguro de que deseas eliminar este barco?
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
          const update = await deleteShip(id);

          setDeleteButton(!deleteButton);

          // Realizar cualquier otra acción necesaria después de eliminar el barco
          console.log("Barco eliminado:", update);

          // Limpiar el formulario u otras acciones después de eliminar el barco
        } catch (error) {
          console.error("Error al eliminar el barco:", error);
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
      <td className="px-1">
        <input
          className="w-full rounded-lg border border-[#58aaae] bg-[#21212d]"
          type="text"
          defaultValue={brand}
          onChange={(e) => setBrand(e.target.value)}
        />
      </td>
      <td className="px-1">
        <input
          type="text"
          className="w-full rounded-lg border border-[#58aaae] bg-[#21212d]"
          defaultValue={model}
          onChange={(e) => setModel(e.target.value)}
        />
      </td>
      <td className="px-1">
        <input
          type="text"
          className="w-full rounded-lg border border-[#58aaae] bg-[#21212d]"
          defaultValue={registration_number}
          onChange={(e) => setRegistrationNumber(e.target.value)}
        />
      </td>
      <td>
        <button
          className="px-4 py-4 bg-[#242529] border-l border-[#58aaae]"
          onClick={handleEdit}
        >
          <SaveIcon />
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

ShipsTableRow.propTypes = {
  id: PropTypes.number,
  registration_number: PropTypes.string,
  brand: PropTypes.string,
  model: PropTypes.string,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default ShipsTableRow;
