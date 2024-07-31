import './App.css'
import router from './router/router'
import { UserContext } from './context/userContext'
import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { getUserByToken } from '../src/services/users.service'


function App() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token && !user) {
      getUserByToken().then((result) => setUser(result))
    }
  }, [])

  return (
    
   
    <UserContext.Provider value={{user, setUser}}>

      <RouterProvider router={router}/>
      <div><Toaster/></div>

    </UserContext.Provider>
   
  )
}

export default App
