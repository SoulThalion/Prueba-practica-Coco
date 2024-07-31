import { useEffect, useState } from "react";
import { getAllClients } from "../services/clients.service";
import ClientsTable from "../components/ClientsComponents/ClientsTable";
import NewClient from "../components/ClientsComponents/NewClient";
import EditClient from "../components/ClientsComponents/EditClient";
import SearchBar from "../components/ClientsComponents/SearchBar";

const Clients = () => {
  const [clients, setClients] = useState([]);
  const [newButton, setNewButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [editClientData, setEditClientData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchAllClients = async () => {
      const data = await getAllClients();
      setClients(data);
    };

    fetchAllClients();
  }, [newButton, editButton, deleteButton]);

  const filteredClients = clients.filter((client) => {
    return Object.values(client).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
      return false;
    });
  });

  
  return (
    <div className="text-white bg-[#1c1d20] relative">
      <div className="flex justify-center items-center h-screen text-white">
        {/* NewClient */}
        {newButton && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <NewClient setNewButton={setNewButton} newButton={newButton} />
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Nuevo Cliente
            </h1>
          </div>
        )}

        {/* EditClient */}
        {editButton && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <EditClient
              editClientData={editClientData}
              setEditButton={setEditButton}
              editButton={editButton}
            />
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Editar Cliente
            </h1>
          </div>
        )}

        {/* ClientsTable */}
        <div
          className={`${
            newButton || editButton ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          <div className="grid grid-cols-2 grid-rows-[50px 1fr] gap-4 mt-0 lg:mt-10">
            <div className="relative col-start-2 row-start-1">
              <SearchBar
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              />
            </div>
            <div className="col-span-2">
              <ClientsTable
                filteredClients={filteredClients}
                setNewButton={setNewButton}
                newButton={newButton}
                setEditClientData={setEditClientData}
                setEditButton={setEditButton}
                editButton={editButton}
                deleteButton={deleteButton}
                setDeleteButton={setDeleteButton}
              />
            </div>
          </div>

          {!newButton && !editButton && (
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Clientes
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Clients;
