import { useEffect, useState } from "react";
import { getUserById } from "../../services/users.service";
import toast from "react-hot-toast";
import { deleteProject } from "../../services/project.service";

const ProjectCard = ({
  project,
  id,
  description,
  name,
  owner_id,
  deleteButton,
  setDeleteButton,
  edit,
  setEdit,
  setTexto,
  setNombre,
  setIdProject
}) => {
  const [owner, setOwner] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    const getOwner = async (id) => {
      const data = await getUserById(id);
      setOwner(data);
    };

    setData(project);

    getOwner(owner_id);
  }, []);

  const handleEditButton = () => {
    setTexto(description)
    setNombre(name)
    setIdProject(id)
    setEdit(!edit);
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
          const update = await deleteProject(id);

          setDeleteButton(!deleteButton);

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

  return (
    <>
      <div className="p-5 px-10 w-80 rounded-3xl bg-orange-300 grid grid-rows-[auto,auto,1fr] gap-1">
        <span className="justify-self-end row-start-1">{id}</span>

        <div className="row-start-1 col-start-1">
          <h1 className="text-3xl">{name}</h1>
          <h3 className="font-bold">{owner.name}</h3>
        </div>
        <p className="row-start-3 col-span-2 overflow-y-auto max-h-32 scrollbar-hide custom-scrollbar">
          {description}
        </p>

        <div className="flex gap-4 w-60 row-start-4 mt-5">
          <button
            type="submit"
            onClick={handleEditButton}
            className="text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Editar
          </button>

          <button
            type="button"
            onClick={handleDelete}
            className="text-blue-700 w-1/2 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Borrar
          </button>
        </div>
      </div>
    </>
  );
};

export default ProjectCard;
