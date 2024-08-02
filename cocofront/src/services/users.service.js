import app from './config'

export const getAllUsers = async () => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await app.get('/users', {
            headers: {
                token: token
            }
        })

        return data

    } catch (error) {
        console.log('Error loging: ', error.message)
    }
}

export const getUserById = async (id) => {
    const token = localStorage.getItem('token');
    const ide = id
    try {
        const { data } = await app.get(`/users/${ide}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        return data

    } catch (error) {
        console.error('Error al borrar el usuario:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};

export const getUserByToken = async () => {
    const token = localStorage.getItem('token');
      
    try {
      const { data } = await app.get('auth/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      return data.user
  
    } catch (error) {
        if (error.response && error.response.status === 401) {
            console.log('Token expirado. Cerrando sesión...');
            localStorage.removeItem('token')
        } else {
            console.log('Error getting user data: ', error.message);
        }
    }
  }