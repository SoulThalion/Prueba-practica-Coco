import app from './config'

export const getAllTasks = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await app.get(`/tasks/project/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        
        return data

    } catch (error) {
        console.log('Error loging: ', error.message)
    }
}

export const createTask = async (title, description, due_date, assigned_to, project_id) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await app.post('/tasks', {
            title: title,
            description: description,
            due_date: due_date,
            assigned_to: assigned_to,
            project_id: project_id
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

export const updateTask = async (id, name, description) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await app.patch(`/tasks/${id}`, {
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


export const deleteTask = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id)
    const ide = id
    try {
        await app.delete(`/tasks/${ide}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        return "Task deleted"

    } catch (error) {
        console.error('Error al borrar el proyecto:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};