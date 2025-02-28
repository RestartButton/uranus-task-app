import axios from '@/lib/axios';
import { getSession } from 'next-auth/react';

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