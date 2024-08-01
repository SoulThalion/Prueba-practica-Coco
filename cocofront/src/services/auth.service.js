import app from './config'

export const signup = async (name, email, password) => {
  try {
    const { data } = await app.post('auth/registrer', {
      name: name,
      email: email,
      password: password,
    });
    return data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const login = async (email, password) => {
  console.log(email)
  console.log(password)
   try {
      const { data } = await app.post('/auth/login', {
        email,
        password
      })
  
      return data
  
    } catch (error) {
      console.log('Error loging: ', error.message)
    }
  }
