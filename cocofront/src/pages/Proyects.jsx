import { useEffect, useState } from "react";
import { getAllProjects } from "../services/project.service.js";
import OrdersTable from "../components/OdersComponents/OrdersTable.jsx";
import NewOrder from "../components/OdersComponents/NewOrder.jsx";
import EditOrder from "../components/OdersComponents/EditOrder.jsx";
import SearchBar from "../components/OdersComponents/SearchBar.jsx";
import ViewOrder from "../components/OdersComponents/ViewOrder.jsx";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import ProjectCard from "../components/cards/ProjectCard.jsx";

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
      {" "}
      {projects && projects.length && (
        <div className="mt-32 mx-20 flex justify-center gap-10 flex-wrap">
          {projects &&
            projects.map((el, idx) => {
              return <ProjectCard key={idx} {...el} />;
            })}
        </div>
      )}
    </>
  );
};

export default Proyects;
