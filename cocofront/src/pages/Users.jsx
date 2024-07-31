import { useEffect, useState } from "react";
import { getAllUsers } from "../services/users.service";
import UsersTable from "../components/UsersComponents/UsersTable";
import NewUser from "../components/UsersComponents/NewUser";
import EditUser from '../components/UsersComponents/EditUser.jsx'
import SearchBar from "../components/UsersComponents/SearchBar";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newButton, setNewButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [editUserData, setEditUserData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      const data = await getAllUsers();
      setUsers(data);
    };

    fetchAllUsers();
  }, [newButton, editButton, deleteButton]);

  const filteredUsers = users.filter((user) => {
    return Object.values(user).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
      return false;
    });
  });

  console.log(filteredUsers);
  return (
    <div className="text-white bg-[#1c1d20] relative">
      <div className="flex justify-center items-center h-screen text-white">
        {/* NewUser */}
        {newButton && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <NewUser setNewButton={setNewButton} newButton={newButton} />
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Nuevo Usuario
            </h1>
          </div>
        )}

        {/* EditUser */}
        {editButton && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <EditUser
              editUserData={editUserData}
              setEditButton={setEditButton}
              editButton={editButton}
            />
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Editar Usuario
            </h1>
          </div>
        )}

        {/* UsersTable */}
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
              <UsersTable
                filteredUsers={filteredUsers}
                setNewButton={setNewButton}
                newButton={newButton}
                setEditUserData={setEditUserData}
                setEditButton={setEditButton}
                editButton={editButton}
                deleteButton={deleteButton}
                setDeleteButton={setDeleteButton}
              />
            </div>
          </div>

          {!newButton && !editButton && (
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Usuarios
            </h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
