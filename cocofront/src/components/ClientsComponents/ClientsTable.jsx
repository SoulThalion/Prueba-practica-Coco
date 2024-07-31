import UserPlusIcon from "../../icons/UserPlusIcon";
import ClientsTableList from "./ClientsTableList";
import PropTypes from "prop-types";

const ClientsTable = ({
  filteredClients,
  setNewButton,
  newButton,
  setEditClientData,
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
              Nombre
            </th>
            <th scope="col" className="px-6 py-3">
              Apellidos
            </th>
            <th scope="col" className="px-6 py-3">
              Dirección
            </th>
            <th scope="col" className="px-6 py-3">
              Teléfono
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Cif
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
          <ClientsTableList
            filteredClients={filteredClients}
            setEditClientData={setEditClientData}
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

ClientsTable.propTypes = {
  filteredClients: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
  setEditClientData: PropTypes.func,
  editClient: PropTypes.bool,
  setEditClient: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default ClientsTable;
