import ClientsTableRow from "./ClientsTableRow";
import PropTypes from "prop-types";

const ClientsTableList = ({
  filteredClients,
  setEditClientData,
  setEditButton,
  editButton,
  deleteButton,
  setDeleteButton,
}) => {
  const formattedClients = filteredClients.map((filteredClients) => (
    <tr
      key={filteredClients.id}
      className="bg-[#21212d] text-white hover:bg-[#323337] border-b border-t border-[#58aaae]"
    >
      <ClientsTableRow
        id={filteredClients.id}
        address={filteredClients.address}
        name={filteredClients.name}
        surName={filteredClients.surName}
        telephone={filteredClients.telephone}
        email={filteredClients.email}
        cif={filteredClients.cif}
        setEditClientData={setEditClientData}
        setEditButton={setEditButton}
        editButton={editButton}
        deleteButton={deleteButton}
        setDeleteButton={setDeleteButton}
      />
    </tr>
  ));

  return <>{formattedClients}</>;
};

ClientsTableList.propTypes = {
  filteredClients: PropTypes.array,
  setEditClientData: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default ClientsTableList;
