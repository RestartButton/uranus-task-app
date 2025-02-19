import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api', // URL base do backend
});

export const getTasks = async () => {
    try {
        const response = await api.get('/tasks');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
        return [];
    }
}

export const createTask = async (task) => {
    try {
        const response = await api.post('/tasks', task);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tarefa: ", error);
    }
}

export const editTask = async (task) => {
    try {
        console.log(task);
        const response = await api.put(`/tasks/${task.id}`, task);
        console.log(task);
        return response.data;
    } catch (error) {
        console.error("Erro ao editar tarefa: ", error);
    }
}

export const deleteTask = async (taskId) => {
    try {
        await api.delete(`/tasks/${taskId}`);
    } catch (error) {
        console.error("Erro ao excluir tarefa: ", error);
    }
}

export default api;
