import app from './config'

export const getAllOrders = async () => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await app.get('/order', {
            headers: {
                token: token
            }
        })

        return data

    } catch (error) {
        console.log('Error loging: ', error.message)
    }
}

export const createOrder = async (work, shipId, clientId) => {
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud POST para crear un nuevo usuario
        const { data } = await app.post('/order', {
            work: work,
            shipId: shipId,
            clientId: clientId
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

export const updateOrder = async (id, appointment, work, hours, finish, shipId, userId, observations) => {
    const token = localStorage.getItem('token');

    try {
        // Realizar la solicitud PATCH para editar una orden
        const userData = {
            work: work,
            hours: hours,
            finish: finish,
            shipId: shipId,
        };

        // Incluir appointment en userData solo si no es un valor vacío
        if (appointment.trim() !== "") {
            userData.appointment = appointment;
        }

        // Incluir userId en userData solo si no es un valor vacío
        if (userId.trim() !== "") {
            userData.userId = userId;
        }

        // Incluir observations en userData solo si no es un valor vacío
        if (observations.trim() !== "") {
            userData.observations = observations;
        }

        const { data } = await app.patch(`/order/${id}`, userData, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });

        return data; // Devolver los datos de la orden editada

    } catch (error) {
        console.error('Error al editar la orden:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};


export const deleteOrder = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id)
    const ide = id
    try {
        await app.delete(`/order/${ide}`, {
            headers: {
                token: token // Incluir el token en el encabezado de autorización
            }
        });


        return "Order deleted"

    } catch (error) {
        console.error('Error al borrar el orden:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};