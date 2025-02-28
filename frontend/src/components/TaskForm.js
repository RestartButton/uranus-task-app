'use client'

import React, { useState, useEffect } from 'react';
import { createTask, editTask } from '@/services/tasksApi';
import { Button } from './ui/button';

export default function TaskForm({ task, onClose }) {
    const [newTask, setNewTask] = useState({ title: "", description: "" });

    useEffect(() => {
        if(task) {
            setNewTask({ title: task.title, description: task.description });
        } else {
            setNewTask({ title: "", description: "" });
        }
    }, []);

    const handleAddTask = async () => {
        if (!newTask.title.trim() || !newTask.description.trim()) 
            return;
        await createTask({ 
            Title: newTask.title,
            Description: newTask.description,
            isCompleted: false
        });
        setNewTask({ title: "", description: "" });
    }

    const handleEditTask = async () => {
        if (!newTask.title.trim() || !newTask.description.trim()) 
            return;
        await editTask({
            ...task,
            Title: newTask.title,
            Description: newTask.description,
            isCompleted: false
        });
        onClose();
    }

    return (
        <form onSubmit={task ? handleEditTask : handleAddTask} className="p-4 bg-background rounded-lg shadow">
            <input
                type="text"
                placeholder="Tarefa"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                className="text-primary w-full mb-2 p-2 border rounded"
            />
            <textarea
                placeholder="Descrição"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="text-primary w-full mb-2 p-2 border rounded"
            />
            <Button
                type="submit"
                className="w-full p-2 rounded flex items-center justify-center"
            >
            {task ? "Salvar" : "Adicionar"}
            </Button>
        </form>
    );

}