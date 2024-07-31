import { createBrowserRouter, redirect } from "react-router-dom";
import Layout from '../layout/Layout'
import Login from '../pages/Login'
import Home from "../pages/Home";
import Users from "../pages/Users";
import Clients from "../pages/Clients";
import Orders from "../pages/Orders";
import Landing from "../pages/Landing";

const isAuthenticated = () => !localStorage.getItem('token') ? redirect("/landing") : null
const isNotAuthenticated = () => localStorage.getItem('token') ? redirect("/") : null

const router = createBrowserRouter([

  {
    path: '/landing',
    element: <Landing />,
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
        path: '/login',
        element: <Login />,
        loader: isNotAuthenticated
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
        path: '/orders',
        element: <Orders/>,
        loader: isAuthenticated,
      },
]}
])

export default router