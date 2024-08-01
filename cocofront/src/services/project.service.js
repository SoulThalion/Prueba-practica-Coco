import app from './config'

export const getAllProjects = async () => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await app.get('/projects', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(data)
        return data

    } catch (error) {
        console.log('Error loging: ', error.message)
    }
}

export const createProject = async (name, description, owner_id) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await app.post('/projects', {
            name: name,
            description: description,
            owner_id: owner_id
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;

    } catch (error) {
        console.error('Error al crear el cliente:', error);
        throw error;
    }
};

export const updateProject = async (id, name, description) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await app.patch(`/projects/${id}`, {
            name,
            description
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data; // Devolver los datos de la orden editada

    } catch (error) {
        console.error('Error al editar la orden:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};


export const deleteProject = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id)
    const ide = id
    try {
        await app.delete(`/projects/${ide}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        return "Project deleted"

    } catch (error) {
        console.error('Error al borrar el proyecto:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};