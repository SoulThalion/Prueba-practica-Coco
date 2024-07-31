import app from './config'

export const getShipsByClientId = async (id) => {
    const token = localStorage.getItem('token');
    const ide = id
    try {
        const { data } = await app.get(`/ship/own/${ide}`, {
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

export const deleteShip = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id)
    const ide = id
    try {
        await app.delete(`/ship/${ide}`, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });


        return "Ship deleted"

    } catch (error) {
        console.error('Error al borrar el barco:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};

export const createShip = async (model, brand, registration_number, id) => {
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud POST para crear un nuevo usuario
        const { data } = await app.post('/ship', {
            model: model,
            brand: brand,
            registration_number: registration_number,
            clientId: id
        }, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });

        return data; // Devolver los datos del nuevo usuario creado

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};

export const updateShip = async (id, model, brand, reg) => {
    console.log(reg)
    const token = localStorage.getItem('token');
    const ide = id;
    try {
        // Realizar la solicitud PATCH para editar un nuevo usuario
        const shipData = {
            id:id,
            model: model,
            brand: brand,
            registration_number: reg,
        };

        const { data } = await app.patch(`/ship/${ide}`, shipData, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });

        return data; // Devolver los datos del usuario editado

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};

export const getShipById = async (id) => {
    const token = localStorage.getItem('token');
    const ide = id
    try {
        const { data } = await app.get(`/ship/${ide}`, {
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