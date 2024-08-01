import { useContext } from 'react';
import { UserContext } from '../context/userContext'

const Home = () => {

  const { user } = useContext(UserContext)

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-4xl text-center mb-4">Bienvenido {user?.name}</h1>
      </div>
    </>
  );
};

export default Home;
