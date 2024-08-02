import OrderIcon from "../../icons/OrderIcon";

const ProjectsButton = () => {
  return (
    <li>
      <a
        href="/proyectos"
        className="flex items-center p-2 rounded-lg dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700 group"
      >
        <OrderIcon />
        <span className="ms-3">Mis Proyectos</span>
      </a>
    </li>
  );
};

export default ProjectsButton;
