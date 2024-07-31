import logo from "../assets/logo_4.png";

const Landing = () => {
  return (
    <div className="lg:grid lg:grid-cols-2 h-screen">
      <div className="flex flex-col lg:justify-center pt-10 lg:p-0 items-center lg:h-screen">
        <div>
          <img src={logo} alt="logo" className="w-52" />
          <p className="md:text-7xl text-4xl">Coco Proyects</p>
          <p className="md:text-3xl text-xl md:pt-4">
            Tu plataforma de proyectos <br />
            colaborativos
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-center items-center lg:grid lg:grid-rows-2 md:p-14 lg:gap-10">

        <div className="bg-blue-500 rounded-3xl flex flex-col justify-center items-center lg:w-2/3 m-5 lg:m-0 p-10 gap-10 shadow-lg">
          <p className="text-white text-xl font-bold">Empieza hoy a crear proyectos que podrás organizar y compartir con tu equipo.</p>
          <button className="bg-orange-400 rounded-lg w-full h-12 text-xl">¡Registrate!</button>
        </div>

        <div className="bg-[#40c057] rounded-3xl flex flex-col justify-center items-center lg:w-2/3 m-5 lg:m-0 p-10 gap-10 shadow-lg">
          <p className="text-white text-xl font-bold">Continúa dónde lo dejaste, ponte al día y comunícate con tus compañeros/as, o crea nuevos proyectos.</p>
          <button className="bg-blue-800 rounded-lg w-full h-12 text-white text-xl">¡Logueate!</button>
        </div>

      </div>


    </div>
  );
};

export default Landing;
