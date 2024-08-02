import { useEffect, useState } from "react";
import { getUserById } from "../services/users.service";
import PropTypes from "prop-types";
import EditIcon from "../icons/EditIcon";
import DeleteIcon from "../icons/DeleteIcon";
import toast from "react-hot-toast";
import { deleteTask, updateTask } from "../services/task.service";

const TaskTableRow = ({ task, reload, setReload, devNames }) => {
  const [dev, setDev] = useState([]);
  const [openEdit, setOpenEdit] = useState(false);

  const handleOpenEdit = () => {
    setOpenEdit(!openEdit);
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
    const getDevelopers = async () => {
      const data = await getUserById(task.assigned_to);
      setDev(data);
    };

    getDevelopers();
  }, [reload]);

  const devs = devNames.map((dev) => (
    <option key={dev.id} value={dev.id}>
      {dev.name}
    </option>
  ));

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const due_date = event.target.fecha.value;
    const assigned_to = event.target.dev.value;
    const id = task.id

    try {
      await updateTask(title, description, due_date, assigned_to, id);
      toast.success("Tarea editada");
      setOpenEdit(!openEdit);
      setReload(!reload);
    } catch (error) {
      console.error("Error al editar la tarea:", error);
    }
  };

  return (
    <>
      <td className="px-6 py-1">{task.title}</td>
      <td className="px-6 py-1 max-w-xs">
        <div className="max-h-5 overflow-y-auto">{task.description}</div>{" "}
      </td>
      <td className="px-6 py-1">{task.status}</td>
      <td className="px-6 py-1">{task.due_date}</td>
      <td className="px-6 py-1">{dev.name}</td>
      <td>
        <button onClick={handleOpenEdit} className="py-1 px-2">
          <EditIcon />{" "}
        </button>
      </td>

      <td>
        <button onClick={handleDelete} className="px-2 py-1">
          <DeleteIcon />
        </button>
      </td>

      {openEdit === true && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative md:w-96 w-3/4 flex justify-center items-center py-10 bg-amber-400 rounded-3xl shadow-lg">
              <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-3/4">
                <div className="mb-5">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre de la tarea
                  </label>
                  <input
                    type="text"
                    id="title"
                    defaultValue={task.title}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción de la tarea
                  </label>
                  <input
                    type="text"
                    id="description"
                    defaultValue={task.description}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="fecha"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Fecha límite
                  </label>
                  <input
                    type="date"
                    id="fecha"
                    defaultValue={task.due_date}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                <div className="mb-5">
                  <label
                    htmlFor="dev"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Desarrollador asignado
                  </label>
                  <select
                    id="dev"
                    name="dev"
                    defaultValue={dev.id}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    
                    {devs}
                  </select>
                </div>

                <div className="flex flex-col gap-4">
                  <button
                    type="submit"
                    className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Crear tarea
                  </button>

                  <button
                    type="button"
                    onClick={handleOpenEdit}
                    className="text-blue-700 w-full bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

TaskTableRow.propTypes = {
  task: PropTypes.object,
};

export default TaskTableRow;
