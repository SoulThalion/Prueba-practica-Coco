import app from './config'

export const getAllClients = async () => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await app.get('/client', {
            headers: {
                token: token
            }
        })

        return data

    } catch (error) {
        console.log('Error loging: ', error.message)
    }
}

export const getClientById = async (id) => {
    const token = localStorage.getItem('token');
    const ide = id
    try {
        const { data } = await app.get(`/client/${ide}`, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });


        return data

    } catch (error) {
        console.error('Error al borrar el usuario:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};


export const createClient = async (address, name, surName, telephone, email, cif) => {
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud POST para crear un nuevo usuario
        const { data } = await app.post('/client', {
            address: address,
            name: name,
            surName: surName,
            telephone: telephone,
            email: email,
            cif: cif
        }, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });

        return data; // Devolver los datos del nuevo cliente creado

    } catch (error) {
        console.error('Error al crear el cliente:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};

export const updateClient = async (id, address, name, surName, telephone, email, cif) => {
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud PATCH para editar un nuevo cliente
        const userData = {
            address: address,
            name: name,
            surName: surName,
            telephone: telephone,
            email: email,
            cif: cif
        };

        const { data } = await app.patch(`/client/${id}`, userData, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });

    return data; // Devolver los datos del cliente editado

} catch (error) {
    console.error('Error al crear el cliente:', error);
    throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
}
};

export const deleteClient = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id)
    const ide= id
    try {   
        await app.delete(`/client/${ide}`, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });
        

    return "Client deleted"

} catch (error) {
    console.error('Error al borrar el cliente:', error);
    throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
}
};