import axios from '@/lib/axios';

export const getTasks = async () => {
    try {
        const response = await axios.get('/tasks');
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
        return [];
    }
}

export const createTask = async (task) => {
    try {
        const response = await axios.post('/tasks', task);
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tarefa: ", error);
    }
}

export const editTask = async (task) => {
    try {
        console.log(task);
        const response = await axios.put(`/tasks/${task.id}`, task);
        console.log(task);
        return response.data;
    } catch (error) {
        console.error("Erro ao editar tarefa: ", error);
    }
}

export const deleteTask = async (taskId) => {
    try {
        await axios.delete(`/tasks/${taskId}`);
    } catch (error) {
        console.error("Erro ao excluir tarefa: ", error);
    }
}



export const getGroups = async () => {

}

export const createGroup = async () => {

}

export const joinGroup = async () => {

}

export const leaveGroup = async () => {

}



export default axios;
