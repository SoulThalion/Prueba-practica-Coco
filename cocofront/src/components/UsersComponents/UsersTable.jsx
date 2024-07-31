import UserPlusIcon from "../../icons/UserPlusIcon";
import UsersTableList from "./UsersTableList";
import PropTypes from "prop-types";

const UsersTable = ({
  filteredUsers,
  setNewButton,
  newButton,
  setEditUserData,
  editButton,
  setEditButton,
  deleteButton,
  setDeleteButton,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll lg:max-h-[360px] xl:max-h-[500px]" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: '#4b5563 #718096' }}>
      <table className="w-full text-sm text-left rtl:text-right text-white border border-[#58aaae]">
        <thead className="text-xs text-white uppercase bg-[#242529]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              UserName
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <td></td>
            <td>
              <button
                scope="col"
                className="px-4 py-3 border-l border-[#58aaae]"
                onClick={() => setNewButton(!newButton)}
              >
                <UserPlusIcon />
              </button>
            </td>
          </tr>
        </thead>
        <tbody>
          <UsersTableList
            filteredUsers={filteredUsers}
            setEditUserData={setEditUserData}
            setEditButton={setEditButton}
            editButton={editButton}
            deleteButton={deleteButton}
            setDeleteButton={setDeleteButton}
          />
        </tbody>
      </table>
    </div>
  );
};

UsersTable.propTypes = {
  filteredUsers: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
  setEditUserData: PropTypes.func,
  editUser: PropTypes.bool,
  setEditUser: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default UsersTable;
