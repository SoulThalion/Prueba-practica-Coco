import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { login, signup } from "../services/auth.service";
import OpenEyeIcon from "../icons/OpenEyeIcon";
import CloseEyeIcon from "../icons/CloseEyeIcon";
import logo from "../assets/logo_4.png";

const Login = () => {
  const navigate = useNavigate();

  const { user, setUser } = useContext(UserContext);
  const [userEmail, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isPassVisible, setIsPassVisible] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = await login(userEmail, password);

    if (data) {
      localStorage.setItem("token", data.access_token);
      setUser(data.user);
      navigate("/");
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
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
          <div className="md:w-96 w-3/4 flex justify-center items-center py-10 bg-yellow-300 md:h-2/3 rounded-3xl shadow-lg">
            <form className="max-w-sm mx-auto w-3/4" onSubmit={handleLogin}>
              <div className="mb-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Tu email
                </label>
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
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
                <div className="relative">
                  <span
                    className="inline-flex absolute inset-y-5 end-0 items-center px-3 text-sm text-gray-900 rounded-s-md"
                    onClick={() => setIsPassVisible((oldState) => !oldState)}
                  >
                    {isPassVisible ? <OpenEyeIcon /> : <CloseEyeIcon />}
                  </span>
                </div>
                <input
                  type={isPassVisible ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>

              <button
                type="submit"
                className="text-white w-full bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Registrarme
              </button>
            </form>
          </div>
        </div>
      </div>
    </UserContext.Provider>
  );
};

export default Login;
