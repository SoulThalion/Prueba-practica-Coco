import PropTypes from "prop-types";
import TaskTable from "./TaskTable";
import { useEffect, useState } from "react";
import { getAllTasks } from "../services/task.service";


const Task = ({ nombre, texto, owner, idProject }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async (id) => {
      const data = await getAllTasks(id);
      setTasks(data);
    };

    getTasks(idProject)
  }, []);

  return (
    <>
    {tasks && tasks.length && (
    <div className="flex flex-col justify-center items-center pt-24">
      <div className="px-32 grid bg-gray-200 mx-32 rounded-2xl py-20">
        <span className="text-right row-start-1 col-start-2">{idProject}</span>
        <h1 className="text-5xl font-semiboldrow-start-1">{nombre}</h1>
        <h3 className="text-2xl row-start-2 pb-2">{owner}</h3>
        <p className="row-start-3">{texto}</p>
        <div className="row-start-4 pt-10">
          <TaskTable tasks={tasks}/>
        </div>
      </div>
    </div>)}
    </>
  );
};

Task.propTypes = {
  nombre: PropTypes.string,
  owner: PropTypes.string,
  texto: PropTypes.string,
  idProject: PropTypes.integer,
};

export default Task;
