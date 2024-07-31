import ShipsTableRow from "./ShipsTableRow";
import PropTypes from "prop-types";

const ShipsTableList = ({
  ships,
  setEditShipData,
  setEditButton,
  editButton,
  deleteButton,
  setDeleteButton,
}) => {
  const formattedShips = ships.map((ships) => (
    <tr
      key={ships.id}
      className="bg-[#21212d] text-white hover:bg-[#323337] border-b border-t border-[#58aaae]"
    >
      <ShipsTableRow
        id={ships.id}
        brand={ships.brand}
        model={ships.model}
        registration_number={ships.registration_number}

        setEditShipData={setEditShipData}
        setEditButton={setEditButton}
        editButton={editButton}
        deleteButton={deleteButton}
        setDeleteButton={setDeleteButton}
      />
    </tr>
  ));

  return <>{formattedShips}</>;
};

ShipsTableList.propTypes = {
  ships: PropTypes.array,
  setEditShipData: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default ShipsTableList;
