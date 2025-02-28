import axios from '@/lib/axios';
import { getSession } from 'next-auth/react';

export const getTasks = async (groupId) => {
    try {
        const session = await getSession();
        const response = await axios.get(`/groups/${groupId}`, {
            headers: { Authorization:  `Bearer ${session.accessToken}` }
        });
        return response.data.taskList;
    } catch (error) {
        console.error("Erro ao buscar tarefas: ", error);
        return [];
    }
}

export const createTask = async (task) => {
    try {
        const session = await getSession();
        const response = await axios.post('/tasks', task, {
            headers: { Authorization:  `Bearer ${session.accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao criar tarefa: ", error);
    }
}

export const editTask = async (task) => {
    try {
        const session = await getSession();
        const response = await axios.put(`/tasks/${task.id}`, task, {
            headers: { Authorization:  `Bearer ${session.accessToken}` }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao editar tarefa: ", error);
    }
}

export const deleteTask = async (taskId) => {
    try {
        const session = await getSession();
        await axios.delete(`/tasks/${taskId}`, {
            headers: { Authorization:  `Bearer ${session.accessToken}` }
        });
    } catch (error) {
        console.error("Erro ao excluir tarefa: ", error);
    }
}

export default axios;
