import { useEffect, useState } from "react";
import { getUserById } from "../../services/users.service";

const ProjectCard = (project) => {
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const getOwner = async (id) => {
      const data = await getUserById(id);
      setOwner(data);
    };

    getOwner(project.owner_id);
  }, []);

  return (
    <div className="p-5 px-10 w-80 rounded-3xl bg-orange-300 grid grid-rows-[auto,auto,1fr] gap-1">
      <span className="justify-self-end row-start-1">{project.id}</span>
      <div className="row-start-1 col-start-1">
        <h1 className="text-3xl">{project.name}</h1>
        <h3 className="font-bold">{owner.name}</h3>
      </div>
      <p className="row-start-3 col-span-2 overflow-y-auto max-h-32 scrollbar-hide custom-scrollbar">
        {project.description}
      </p>
    </div>
  );
};

export default ProjectCard;
