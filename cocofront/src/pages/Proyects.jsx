import { useEffect, useState } from "react";
import { getAllProjects } from "../services/project.service.js";
import OrdersTable from "../components/OdersComponents/OrdersTable.jsx";
import NewOrder from "../components/OdersComponents/NewOrder.jsx";
import EditOrder from "../components/OdersComponents/EditOrder.jsx";
import SearchBar from "../components/OdersComponents/SearchBar.jsx";
import ViewOrder from "../components/OdersComponents/ViewOrder.jsx";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";

const Proyects = () => {
  const { user } = useContext(UserContext);
  const [projects, setProjects] = useState("");

  useEffect(() => {
    const fetchAllProjects = async () => {
      const data = await getAllProjects();
      setProjects(data);
    };

    fetchAllProjects();
  }, []);
  console.log(projects);
  /*const filteredOrders = orders.filter((user) => {
    return Object.values(user).some((value) => {
      if (typeof value === "string" || typeof value === "number") {
        return value
          .toString()
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
      return false;
    });
  });*/

  return (
    <>
      <div className="mt-32 mx-20">
        <div className="p-10 w-80 rounded-3xl bg-orange-300">
          <h1 className="text-3xl">{projects[0].name}</h1>
          <p>{projects[0].description}</p>
        </div>
      </div>
    </>
  );
};

export default Proyects;
