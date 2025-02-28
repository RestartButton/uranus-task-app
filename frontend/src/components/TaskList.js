'use client'

import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask } from '@/services/tasksApi';
import TaskCard from "./TaskCard";

const TaskList = ({ onEdit }) => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        async function fetchTasks() {
            const data = await getTasks();
            setTasks(data);
        }
        fetchTasks();
    }, []);

    const handleDeleteTask = async (id) => {
        await deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
    }

    const handleToggleTask = (taskId) => {
        setTasks((prevTasks) => 
            prevTasks.map((task) => task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task )
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {tasks.length > 0 ? (
                tasks.map((task) => (
                    <TaskCard 
                        key={task.id} 
                        task={task} 
                        onDelete={handleDeleteTask} 
                        onToggle={handleToggleTask}
                        onEdit={onEdit}
                    />
                ))
            ) : (
                <p className="text-gray-400">Nenhuma tarefa disponível.</p>
            )}
        </div>
    );
}

export default TaskList;