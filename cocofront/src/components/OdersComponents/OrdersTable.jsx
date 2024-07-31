import PlusIcon from "../../icons/PlusIcon";
import OrdersTableList from "./OrdersTableList";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";

const OrdersTable = ({
  filteredOrders,
  setNewButton,
  newButton,
  setEditOrderData,
  editButton,
  setEditButton,
  deleteButton,
  setDeleteButton,
  view,
  setView,
  setDocument,
}) => {
  const { user } = useContext(UserContext);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Considerando una anchura de 768px para determinar vista de móvil
    };

    handleResize(); // Verificar tamaño inicial
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño
    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el listener al desmontar el componente
    };
  }, []);

  return isMobileView ? (
    <><div
    className="relative w-full overflow-x-auto shadow-md rounded-lg border-2 border-[#58aaae]"
  >
      <OrdersTableList
        filteredOrders={filteredOrders}
        setEditOrderData={setEditOrderData}
        setEditButton={setEditButton}
        editButton={editButton}
        deleteButton={deleteButton}
        setDeleteButton={setDeleteButton}
        view={view}
        setView={setView}
        setDocument={setDocument}
      />
      </div>
    </>
  ) : (
    <div
      className="relative overflow-x-auto shadow-md sm:rounded-lg overflow-y-scroll lg:max-h-[360px] xl:max-h-[500px]"
      style={{
        WebkitOverflowScrolling: "touch",
        scrollbarWidth: "thin",
        scrollbarColor: "#4b5563 #718096",
      }}
    >
      <table className="w-full text-sm text-left rtl:text-right text-white border border-[#58aaae]">
        <thead className="text-xs text-white uppercase bg-[#242529]">
          <tr>
            {user?.role === "admin" || user?.role === "manager" ? (
              <>
                <th scope="col" className="px-6 py-3">
                  Id
                </th>
                <th scope="col" className="px-6 py-3">
                  Id Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Id Barco
                </th>
                <th scope="col" className="px-6 py-3">
                  Cita
                </th>
                <th scope="col" className="px-6 py-3">
                  Trabajo
                </th>
                <th scope="col" className="px-6 py-3">
                  Horas
                </th>
                <th scope="col" className="px-6 py-3">
                  Estado
                </th>
                <th scope="col" className="px-6 py-3">
                  Id Mecánico
                </th>
                <th scope="col" className="px-6 py-3">
                  Observaciones
                </th>
                <td></td>
                <td></td>

                <td>
                  <button
                    scope="col"
                    className="px-4 py-3 border-l border-[#58aaae]"
                    onClick={() => setNewButton(!newButton)}
                  >
                    <PlusIcon />
                  </button>
                </td>
              </>
            ) : (
              <>
                <th scope="col" className="px-6 py-3">
                  Cliente
                </th>
                <th scope="col" className="px-6 py-3">
                  Dirección
                </th>
                <th scope="col" className="px-6 py-3">
                  Teléfono
                </th>
                <th scope="col" className="px-6 py-3">
                  Cita
                </th>
                <th scope="col" className="px-6 py-3">
                  Horas
                </th>
                <th></th>
                <th></th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          <OrdersTableList
            filteredOrders={filteredOrders}
            setEditOrderData={setEditOrderData}
            setEditButton={setEditButton}
            editButton={editButton}
            deleteButton={deleteButton}
            setDeleteButton={setDeleteButton}
            view={view}
            setView={setView}
            setDocument={setDocument}
          />
        </tbody>
      </table>
    </div>
  );
};

OrdersTable.propTypes = {
  filteredOrders: PropTypes.array,
  setNewButton: PropTypes.func,
  newButton: PropTypes.bool,
  setEditOrderData: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
  view: PropTypes.bool,
  setView: PropTypes.func,
  setDocument: PropTypes.func
};

export default OrdersTable;
