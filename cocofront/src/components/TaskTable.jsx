import PropTypes from "prop-types";
import TaskTableRow from "./TaskTableRow";
import PlusTaskIcon from "../icons/PlusTaskIcon";
import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users.service";
import { createTask } from "../services/task.service";
import toast from "react-hot-toast";

const TaskTable = ({ tasks, idProject, reload, setReload, newButton, setNewButton, devNames }) => {
  
  const handleOpenNew = () => {
    setNewButton(!newButton);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    const description = event.target.description.value;
    const due_date = event.target.fecha.value;
    const assigned_to = event.target.dev.value;
    const project_id = idProject

    try {
      await createTask(title, description, due_date, assigned_to, project_id);
      toast.success("Tarea creada");
      setNewButton(!newButton);
      setReload(!reload);
    } catch (error) {
      console.error("Error al crear la tarea:", error);
    }
  };

  const rows = tasks.map((task) => (
    <tr
      key={task.id}
      className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-orange-100"
    >
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {task.id}
      </th>
      <TaskTableRow task={task} reload={reload} setReload={setReload} devNames={devNames}/>
    </tr>
  ));

  const devs = devNames.map((dev) => (
    <option key={dev.id} value={dev.id}>{dev.name}</option>
  ));

  return (
    <>
      {tasks && tasks.length && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-auto max-h-80 scrollbar-hide custom-scrollbar">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Título
                </th>
                <th scope="col" className="px-6 py-3">
                  Descripción
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Fecha límite
                </th>
                <th scope="col" className="px-6 py-3">
                  Desarrollador
                </th>
                <th></th>
                <th
                  scope="col"
                  className="px-2 py-2 flex justify-center items-center"
                >
                  <button onClick={handleOpenNew}>
                    <PlusTaskIcon />
                  </button>
                </th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
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

TaskTable.propTypes = {
  tasks: PropTypes.object,
};

export default TaskTable;
