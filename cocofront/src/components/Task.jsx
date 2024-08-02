import PropTypes from "prop-types";
import TaskTable from "./TaskTable";
import { useEffect, useState } from "react";
import { getAllTasks } from "../services/task.service";
import ExitIcon from "../icons/ExitIcon";

const Task = ({ nombre, texto, owner, idProject, task, setTask }) => {
  const [tasks, setTasks] = useState([]);
  const [reload, setReload] =useState(false)


  const handleClose = ()=>{
    setTask(!task)
  }

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
        <button 
        onClick={handleClose}
        className="row-start-1 col-start-2 -mt-10 -mr-10"><ExitIcon/> </button>
        <span className="text-right row-start-2 col-start-2 mt-4">{idProject}</span>
        <h1 className="text-5xl font-semibold row-start-2">{nombre}</h1>
        <h3 className="text-2xl row-start-3 pb-2">{owner}</h3>
        <p className="row-start-4">{texto}</p>
        <div className="row-start-5 pt-10">
          <TaskTable tasks={tasks} idProject={idProject} reload={reload} setReload={setReload}/>
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
