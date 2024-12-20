'use client'

import React, { useEffect, useState } from 'react';
import api from '../services/api';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/tasks')
            .then(response => setTasks(response.data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <ul>
                {tasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.isCompleted ? 'Concluído' : 'Pendente'}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TaskList;