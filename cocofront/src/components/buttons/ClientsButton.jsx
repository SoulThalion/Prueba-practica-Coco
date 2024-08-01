import ClientsIcon from "../../icons/ClientsIcon";

const ClientsButton = () => {
  return (
    <li>
      <a
        href="/clients"
        className="flex items-center p-2 rounded-lg dark:text-white hover:bg-orange-100 dark:hover:bg-gray-700 group"
      >
        <ClientsIcon />
        <span className="flex-1 ms-3 whitespace-nowrap">Clientes</span>
      </a>
    </li>
  );
};

export default ClientsButton;
