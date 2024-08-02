import app from './config'

export const getAllComments = async (id) => {
    const token = localStorage.getItem('token');
    try {
        const { data } = await app.get(`/comments/task/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        return data.reverse()

    } catch (error) {
        console.log('Error loging: ', error.message)
    }
}

export const createComment = async (content, taskId, userId) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await app.post('/comments', {
            content: content,
            task_id: taskId,
            user_id: userId,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;

    } catch (error) {
        console.error('Error al crear el comentario:', error);
        throw error;
    }
};

export const updateComment = async (title, description, due_date, assigned_to, id) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await app.patch(`/comment/${id}`, {
            title,
            description,
            due_date,
            assigned_to
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        return data;

    } catch (error) {
        console.error('Error al editar el comentario:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};


export const deleteComment = async (id) => {
    const token = localStorage.getItem('token');
    console.log(id)
    const ide = id
    try {
        await app.delete(`/comments/${ide}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });


        return "Comment deleted"

    } catch (error) {
        console.error('Error al borrar el comentario:', error);
        throw error; // Propagar el error para que pueda ser manejado por el código que llama a esta función
    }
};