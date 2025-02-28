import axios from '@/lib/axios';
import { getSession } from 'next-auth/react';

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
    try {
        const session = await getSession();
        const response = await axios.get('/groups', {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar grupos: ", error);
        return [];
    }
}

export const createGroup = async (group) => {
    try {
        const session = await getSession();
        const response = await axios.post('/groups', group, {
            headers: {
                Authorization: `Bearer ${session.accessToken}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar grupo: ", error);
    }
}

export const joinGroup = async () => {

}

export const leaveGroup = async () => {

}



export default axios;
