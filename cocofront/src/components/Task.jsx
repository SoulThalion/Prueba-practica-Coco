import PropTypes from "prop-types";
import TaskTable from "./TaskTable";
import { useEffect, useState } from "react";
import { createTask, getAllTasks } from "../services/task.service";
import ExitIcon from "../icons/ExitIcon";
import toast from "react-hot-toast";
import { getAllUsers } from "../services/users.service";

const Task = ({ nombre, texto, owner, idProject, task, setTask }) => {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] = useState(false);
  const [newButton, setNewButton] = useState(false);
  const [devNames, setDevNames] = useState([]);

  const handleClose = () => {
    setTask(!task);
  };

  const handleOpenNew = () => {
    setNewButton(!newButton);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const due_date = event.target.fecha.value;
    const assigned_to = event.target.dev.value;
    const project_id = idProject;

    try {
      await createTask(title, description, due_date, assigned_to, project_id);
      toast.success("Tarea creada");
      setNewButton(!newButton);
      setReload(!reload);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  useEffect(() => {
    const getTasks = async (id) => {
      const data = await getAllTasks(id);
      setTasks(data);
    };

    const getDevelopers = async () => {
      const data = await getAllUsers();
      setDevNames(data);
    };

    getDevelopers();

    getTasks(idProject);
  }, [reload]);

  const devs = devNames.map((dev) => (
    <option key={dev.id} value={dev.id}>{dev.name}</option>
  ));

  return (
    <>
      {tasks && tasks.length && (
        <div className="flex flex-col justify-center items-center pt-24">
          <div className="px-32 grid bg-blue-500 mx-32 rounded-2xl py-20">
            <button
              onClick={handleClose}
              className="row-start-1 col-start-2 -mt-10 -mr-10"
            >
              <ExitIcon />{" "}
            </button>
            <span className="text-right row-start-2 col-start-2 mt-4 text-white">
              {idProject}
            </span>
            <h1 className="text-5xl font-semibold row-start-2 text-amber-300">{nombre}</h1>
            <h3 className="text-2xl row-start-3 pb-2 text-white">{owner}</h3>
            <p className="row-start-4 text-white">{texto}</p>
            <div className="row-start-5 pt-10">
              <TaskTable
                tasks={tasks}
                idProject={idProject}
                reload={reload}
                setReload={setReload}
                newButton={newButton}
                setNewButton={setNewButton}
                devNames={devNames}
              />
            </div>
          </div>
        </div>
      )}

      {tasks.length === 0 && (
        <div className="flex flex-col justify-center items-center pt-24">
          <div className="px-32 grid bg-gray-200 mx-32 rounded-2xl py-20">
            <button
              onClick={handleClose}
              className="row-start-1 col-start-2 -mt-10 -mr-10"
            >
              <ExitIcon />{" "}
            </button>
            <span className="text-right row-start-2 col-start-2 mt-4">
              {idProject}
            </span>
            <h1 className="text-5xl font-semibold row-start-2">{nombre}</h1>
            <h3 className="text-2xl row-start-3 pb-2">{owner}</h3>
            <p className="row-start-4">{texto}</p>
            <div className="row-start-5 pt-10">
              <p>
                Aún no hay tareas para este proyecto, ¡Crea una nueva tarea!
              </p>{" "}
              <br />
              <button 
              onClick={handleOpenNew}
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >Crear nueva tarea</button>
            </div>
          </div>
        </div>
      )}

      {newButton === true && (
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
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  >
                    <option value="" disabled selected>
                      Selecciona desarrollador
                    </option>
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
                    onClick={handleOpenNew}
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

Task.propTypes = {
  nombre: PropTypes.string,
  owner: PropTypes.string,
  texto: PropTypes.string,
  idProject: PropTypes.integer,
  task: PropTypes.bool,
  setTask: PropTypes.func,
};

export default Task;
