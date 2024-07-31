import logo from "../assets/logo_4.png";

const Register = () => {
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

      <div className="flex justify-center lg:justify-start lg:ml-10 items-center pt-10 lg:pt-0">
        <div className="md:w-96 w-3/4 flex justify-center items-center py-10 bg-yellow-300 md:h-2/3 rounded-3xl">
          <htmlForm className="max-w-sm mx-auto w-3/4">
          <div className="mb-5">
              <label
                htmlFor="nombre"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu nombre
              </label>
              <input
                type="password"
                id="nombre"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu email
              </label>
              <input
                type="email"
                id="email"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                placeholder="name@example.com"
                required
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tu contraseña
              </label>
              <input
                type="password"
                id="password"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>
            
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="terms"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                  required
                />
              </div>
              <label
                htmlFor="terms"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Acepto las{" "}
                <a
                  href="#"
                  className="text-blue-600 hover:underline dark:text-blue-500"
                >
                  condiciones de uso
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Registrarme
            </button>
          </htmlForm>
        </div>
      </div>
    </div>
  );
};

export default Register;
