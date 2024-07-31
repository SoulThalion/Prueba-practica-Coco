import ShipsTableList from "./ShipsTableList";
import PropTypes from "prop-types";

const ShipsTable = ({
  ships,
  setEditShipData,
  editButton,
  setEditButton,
  deleteButton,
  setDeleteButton,
}) => {
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll lg:max-h-[100px] xl:max-h-[150px]" style={{ WebkitOverflowScrolling: 'touch', scrollbarWidth: 'thin', scrollbarColor: '#4b5563 #718096' }}>
      <table className="w-full text-sm text-left rtl:text-right text-white border border-[#58aaae]">
        <thead className="text-xs text-white uppercase bg-[#242529]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Id
            </th>
            <th scope="col" className="px-6 py-3">
              Modelo
            </th>
            <th scope="col" className="px-6 py-3">
              Marca
            </th>
            <th scope="col" className="px-6 py-3">
              Matricula
            </th>

          </tr>
        </thead>
        <tbody>
          <ShipsTableList
            ships={ships}
            setEditShipData={setEditShipData}
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

ShipsTable.propTypes = {
  ships: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
  setEditShipData: PropTypes.func,
  editShip: PropTypes.bool,
  setEditShip: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
};

export default ShipsTable;
