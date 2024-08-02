import PropTypes from "prop-types";
import TaskTableRow from "./TaskTableRow";

const TaskTable = ({ tasks }) => {
  
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
      <TaskTableRow task={task}/>
    </tr>
  ));

  return (
    <>
      {tasks && tasks.length && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-600 dark:text-gray-400">
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
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </table>
        </div>
      )}
    </>
  );
};

TaskTable.propTypes = {
  tasks: PropTypes.object,
};

export default TaskTable;
