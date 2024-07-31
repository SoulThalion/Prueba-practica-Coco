import { useEffect, useState } from "react";
import OrdersTableRow from "./OrdersTableRow";
import PropTypes from "prop-types";

const OrdersTableList = ({
  filteredOrders,
  setEditOrderData,
  setEditButton,
  editButton,
  deleteButton,
  setDeleteButton,
  view,
  setView,
  setDocument,
}) => {
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

  const formattedOrders = filteredOrders.map((filteredOrder) => (
    <>
      {isMobileView ? (
        <table className="text-sm text-left rtl:text-right text-white w-screen">
          <tbody>
            <tr
              key={filteredOrder.id}
              className="bg-[#21212d] text-white hover:bg-[#323337]"
            >
              <OrdersTableRow
                id={filteredOrder.id}
                appointment={filteredOrder.appointment}
                work={filteredOrder.work}
                hours={filteredOrder.hours}
                finish={filteredOrder.finish}
                userId={filteredOrder.userId}
                shipId={filteredOrder.shipId}
                clientId={filteredOrder.clientId}
                observations={filteredOrder.observations}
                setEditOrderData={setEditOrderData}
                setEditButton={setEditButton}
                editButton={editButton}
                deleteButton={deleteButton}
                setDeleteButton={setDeleteButton}
                view={view}
                setView={setView}
                setDocument={setDocument}
              />
            </tr>
          </tbody>
        </table>
      ) : (
        <tr
          key={filteredOrder.id}
          className="bg-[#21212d] text-white hover:bg-[#323337] border-b border-t border-[#58aaae]"
        >
          <OrdersTableRow
            id={filteredOrder.id}
            appointment={filteredOrder.appointment}
            work={filteredOrder.work}
            hours={filteredOrder.hours}
            finish={filteredOrder.finish}
            userId={filteredOrder.userId}
            shipId={filteredOrder.shipId}
            clientId={filteredOrder.clientId}
            observations={filteredOrder.observations}
            setEditOrderData={setEditOrderData}
            setEditButton={setEditButton}
            editButton={editButton}
            deleteButton={deleteButton}
            setDeleteButton={setDeleteButton}
            view={view}
            setView={setView}
            setDocument={setDocument}
          />
        </tr>
      )}
    </>
  ));

  return <>{formattedOrders}</>;
};

OrdersTableList.propTypes = {
  filteredOrders: PropTypes.array,
  setEditOrderData: PropTypes.func,
  editButton: PropTypes.bool,
  setEditButton: PropTypes.func,
  setDeleteButton: PropTypes.func,
  deleteButton: PropTypes.bool,
  view: PropTypes.bool,
  setView: PropTypes.func,
  setDocument: PropTypes.func
};

export default OrdersTableList;
