import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from '../layout/Layout'
import Login from '../pages/Login'
import Home from "../pages/Home";
import Users from "../pages/Users";
import Clients from "../pages/Clients";
import Proyects from "../pages/Proyects";
import Landing from "../pages/Landing";
import Register from "../pages/Register";

const isAuthenticated = () => !localStorage.getItem('token') ? redirect("/landing") : null
const isNotAuthenticated = () => localStorage.getItem('token') ? redirect("/") : null

const router = createBrowserRouter([

  {
    path: '/landing',
    element: <Landing />,
    loader: isNotAuthenticated
  },
  {
    path: '/register',
    element: <Register />,
    loader: isNotAuthenticated
  },
  {
    path: '/login',
    element: <Login />,
    loader: isNotAuthenticated
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home/>,
        loader: isAuthenticated,
      },
      {
        path: '/users',
        element: <Users/>,
        loader: isAuthenticated,
      },
      {
        path: '/clients',
        element: <Clients/>,
        loader: isAuthenticated,
      },
      {
        path: '/proyectos',
        element: <Proyects/>,
        loader: isAuthenticated,
      },
]}
])

export default router