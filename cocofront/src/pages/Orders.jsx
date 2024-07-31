import { useEffect, useState } from "react";
import { getAllOrders } from "../services/orders.service";
import OrdersTable from "../components/OdersComponents/OrdersTable.jsx";
import NewOrder from "../components/OdersComponents/NewOrder.jsx";
import EditOrder from "../components/OdersComponents/EditOrder.jsx";
import SearchBar from "../components/OdersComponents/SearchBar.jsx";
import ViewOrder from "../components/OdersComponents/ViewOrder.jsx";
import { useContext } from "react";
import { UserContext } from "../context/userContext";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [newButton, setNewButton] = useState(false);
  const [editButton, setEditButton] = useState(false);
  const [deleteButton, setDeleteButton] = useState(false);
  const [editOrderData, setEditOrderData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [view, setView] = useState(false);
  const [document, setDocument] = useState({})
  const { user } = useContext(UserContext);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const fetchAllOrders = async () => {
      const data = await getAllOrders();
      setOrders(data);
    };

    fetchAllOrders();

    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); // Considerando una anchura de 768px para determinar vista de móvil
    };

    handleResize(); // Verificar tamaño inicial
    window.addEventListener("resize", handleResize); // Escuchar cambios de tamaño
    return () => {
      window.removeEventListener("resize", handleResize); // Limpiar el listener al desmontar el componente
    };
  }, [newButton, editButton, deleteButton]);

  const filteredOrders = orders.filter((user) => {
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

  return (
    <div className="text-white bg-[#1c1d20] relative">
      <div className="flex justify-center lg:items-center lg:pt-0 h-screen text-white pt-40">
        {/* NewOrder */}
        {newButton && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <NewOrder setNewButton={setNewButton} newButton={newButton} />
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Nueva Orden
            </h1>
          </div>
        )}

        {/* EditOrder */}
        {editButton && (
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <EditOrder
              editOrderData={editOrderData}
              setEditOrderData={setEditOrderData}
              setEditButton={setEditButton}
              editButton={editButton}
            />
            <h1 className={`absolute top-20 right-5 text-4xl text-center mb-4 z-100 ${user.role === "mechanic" ? "hidden" : ""}`}>
              Editar Orden
            </h1>
          </div>
        )}

        {/* OrdersTable */}
        <div
          className={`${
            newButton || editButton ? "opacity-50 pointer-events-none" : ""
          }`}
        >
          
          <div className="grid grid-cols-2 grid-rows-[50px 1fr] gap-4 mt-0 lg:mt-10">
            {user?.role === "admin" || user?.role === "manager" && 
            <div className="relative col-start-2 row-start-1">
              <SearchBar
                setSearchValue={setSearchValue}
                searchValue={searchValue}
              />
            </div>}
            <div className="col-span-2">
              <OrdersTable
                filteredOrders={filteredOrders}
                setNewButton={setNewButton}
                newButton={newButton}
                setEditOrderData={setEditOrderData}
                setEditButton={setEditButton}
                editButton={editButton}
                deleteButton={deleteButton}
                setDeleteButton={setDeleteButton}
                view={view}
                setView={setView}
                document={document}
                setDocument={setDocument}
              />
            </div>
          </div>

          {!newButton && !editButton && (
            <h1 className="absolute top-20 right-5 text-4xl text-center mb-4 z-100">
              Ordenes
            </h1>
          )}
        </div>
      </div>
      {view && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <ViewOrder view={view} setView={setView} document={document}/>
        </div>
      )}
    </div>
  );
};

export default Orders;
