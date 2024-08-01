const ProjectCard = (project) => {
  return (
    <div className="p-5 px-10 w-80 rounded-3xl bg-orange-300 grid grid-cols-2 gap-2">
      <span className="justify-self-end h-10">{project.id}</span>
      <h1 className="text-3xl row-start-1 h-10">{project.name} </h1>
      <p className="row-start-2 col-span-2 overflow-y-auto max-h-32 scrollbar-hide custom-scrollbar">
        {project.description}{" "}
      </p>
    </div>
  );
};

export default ProjectCard;
