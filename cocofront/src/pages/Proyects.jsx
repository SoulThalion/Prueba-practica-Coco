import { useEffect, useState } from "react";
import { getAllProjects } from "../services/project.service.js";
import { useContext } from "react";
import { UserContext } from "../context/userContext.js";
import ProjectCard from "../components/cards/ProjectCard.jsx";
import { getUserById } from "../services/users.service.js";

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

  return (
    <>
      {projects && projects.length && (
        <div className="mt-32 lg:mx-20 flex justify-center gap-10 flex-wrap">
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
