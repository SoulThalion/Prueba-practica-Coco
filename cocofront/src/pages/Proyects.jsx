import { useEffect, useState } from "react";
import { createProject, getAllProjects, updateProject } from "../services/project.service.js";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import ProjectCard from "../components/cards/ProjectCard.jsx";
import PlusIcon from "../icons/PlusIcon.jsx";
import toast from "react-hot-toast";

const Proyects = () => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState("");
  const [newButton, setNewButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [edit, setEdit] = useState(false);
  const [nombre, setNombre] = useState("")
  const [texto, setTexto] = useState("")
  const [idProject, setIdProject] = useState("")


  useEffect(() => {
    const fetchAllProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };

    fetchAllProjects();
  }, [newButton, deleteButton]);

  const handleNew = () => {
    setNewButton(!newButton);
  };

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const description = event.target.description.value;
    const owner = user.id;

    try {
      await createProject(name, description, owner);
      toast.success("Proyecto creado");
      setNewButton(!newButton);
    } catch (error) {
      console.error("Error al crear el proyecto:", error);
    }
  };

  const handleSubmitEdit = async (event) => {
    event.preventDefault();

    const id = idProject;
    const name = nombre;
    const description = texto;


    try {
      const update = await updateProject(
        id,
        name,
        description
      );

      toast.success('Usuario editado')
      setDeleteButton(!deleteButton);
      setEdit(!edit)
      console.log("Usuario editado:", update);

      // Limpiar el formulario o realizar otras acciones después de crear el usuario
    } catch (error) {
      console.error("Error al crear el usuario:", error);
      // Manejar el error, por ejemplo, mostrar un mensaje de error al usuario
    }
  };

  return (
    <>
      <button
        onClick={handleNew}
        className="fixed top-24 right-10 rounded-full bg-gray-100 p-2 shadow-2xl hover:bg-orange-100"
      >
        <PlusIcon />{" "}
      </button>
      {projects && projects.length && (
        <div className="pt-32 lg:mx-20 flex justify-center gap-10 flex-wrap">
          {projects &&
            projects.map((el, idx) => {
              return (
                <ProjectCard
                  key={idx}
                  {...el}
                  deleteButton={deleteButton}
                  setDeleteButton={setDeleteButton}
                  edit={edit}
                  setEdit={setEdit}
                  setNombre={setNombre}
                  setTexto={setTexto}
                  setIdProject={setIdProject}
                />
              );
            })}
        </div>
      )}

      {newButton === true && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative md:w-96 w-3/4 flex justify-center items-center py-10 bg-amber-400 rounded-3xl shadow-lg">
              <form onSubmit={handleSubmit} className="max-w-sm mx-auto w-3/4">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción del proyecto
                  </label>
                  <input
                    type="text"
                    id="description"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Crear proyecto
                  </button>

                  <button
                    type="button"
                    onClick={handleNew}
                    className="text-blue-700 w-1/2 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Cancelar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}

      {edit === true && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative md:w-96 w-3/4 flex justify-center items-center py-10 bg-amber-400 rounded-3xl shadow-lg">
              <form onSubmit={handleSubmitEdit} className="max-w-sm mx-auto w-3/4">
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Nombre del proyecto
                  </label>
                  <input
                    type="text"
                    id="name"
                    defaultValue={nombre}
                    onChange={(e)=>{setNombre(e.target.value)}}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Descripción del proyecto
                  </label>
                  <input
                    type="text"
                    id="description"
                    onChange={(e)=>{setTexto(e.target.value)}}
                    defaultValue={texto}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="text-white w-1/2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Guardar cambios
                  </button>

                  <button
                    type="button"
                    onClick={handleEdit}
                    className="text-blue-700 w-1/2 bg-white hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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

export default Proyects;
