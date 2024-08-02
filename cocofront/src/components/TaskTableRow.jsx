import { useEffect, useState } from "react";
import { getUserById } from "../services/users.service";
import PropTypes from "prop-types";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import toast from "react-hot-toast";
import { deleteTask } from "../services/task.service";

const TaskTableRow = ({ task, reload, setReload }) => {
  const [dev, setDev] = useState("");

  const handleDelete = async (event) => {
    event.preventDefault();

    try {
      // Muestra el toast de confirmación
      const confirmation = await new Promise((resolve) => {
        // Resuelve la promesa con true cuando se pulsa Aceptar
        const handleConfirm = () => {
          resolve(true);
          toast.dismiss(); // Cierra el toast al confirmar
          toast.success("Proyecto eliminado");
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
                ¿Estás seguro de que deseas eliminar este proyecto?
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
          const update = await deleteTask(task.id);

          setReload(!reload);

          // Realizar cualquier otra acción necesaria después de eliminar el proyecto
          console.log("Proyecto eliminado:", update);

          // Limpiar el formulario u otras acciones después de eliminar el proyecto
        } catch (error) {
          console.error("Error al eliminar el proyecto:", error);
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

  useEffect(() => {
    const getDeveloper = async (id) => {
      const data = await getUserById(id);
      setDev(data.name);
    };

    getDeveloper(task.assigned_to);
  }, []);

  return (
    <>
      <td className="px-6 py-1">{task.title}</td>
      <td className="px-6 py-1 max-w-xs">
        <div className="max-h-5 overflow-y-auto">{task.description}</div>{" "}
      </td>
      <td className="px-6 py-1">{task.status}</td>
      <td className="px-6 py-1">{task.due_date}</td>
      <td className="px-6 py-1">{dev}</td>
      <td>
        <button className="py-1 px-2">
          <EditIcon />{" "}
        </button>
      </td>

      <td>
        <button
        onClick={handleDelete}
        className="px-2 py-1">
          <DeleteIcon />
        </button>
      </td>
    </>
  );
};

TaskTableRow.propTypes = {
  task: PropTypes.object,
};

export default TaskTableRow;
