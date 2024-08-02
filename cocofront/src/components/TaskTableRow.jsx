import { useEffect, useState } from "react";
import { getUserById } from "../services/users.service";
import PropTypes from "prop-types";

const TaskTableRow = ({task}) => {

    const [dev, setDev] = useState("");

    useEffect(() => {
      const getDeveloper = async (id) => {
        const data = await getUserById(id);
        setDev(data.name);
      };
  
      getDeveloper(task.assigned_to);
    }, []);

  return (
    <>
      <td className="px-6 py-4">{task.title}</td>
      <td className="px-6 py-4">{task.description}</td>
      <td className="px-6 py-4">{task.status}</td>
      <td className="px-6 py-4">{task.due_date}</td>
      <td className="px-6 py-4">{dev}</td>
    </>
  );
};

TaskTableRow.propTypes = {
    task: PropTypes.object,
  };

export default TaskTableRow;
