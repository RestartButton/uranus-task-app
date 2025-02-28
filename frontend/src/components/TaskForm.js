'use client'

import React, { useState, useEffect } from 'react';
import { createTask, editTask } from '@/services/tasksApi';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Plus, X } from 'lucide-react';
import { useGroup } from '@/context/GroupContext';
import { DialogClose } from '@radix-ui/react-dialog';

export default function TaskForm({ task, onClose, open }) {
    const [newTask, setNewTask] = useState({ title: "", description: "" });
    const { activeGroup } = useGroup();

    useEffect(() => {
        if(task) {
            console.log(task)
            setNewTask({ title: task.title, description: task.description });
        } else {
            setNewTask({ title: "", description: "" });
        }
    }, [task]);

    const handleAddTask = async () => {
        if (!newTask.title.trim() || !newTask.description.trim()) 
            return;
        await createTask({ 
            Title: newTask.title,
            Description: newTask.description,
            isCompleted: false,
            GroupId: activeGroup.id
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
            isCompleted: false,
            GroupId: activeGroup.id
        });
        onClose(false);
    }

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogTrigger asChild>
                <Button 
                    className="fixed bottom-4 right-4 w-14 h-14 rounded-full shadow-lg bg-primary text-secondary hover:bg-primary/80 flex items-center justify-center"
                    size="icon"
                >
                    <Plus className="w-6 h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="text-primary">{task ? "Editar" : "Nova"} Tarefa</DialogTitle>
                </DialogHeader>
                <form onSubmit={task ? handleEditTask : handleAddTask} className="p-4 bg-background rounded-lg shadow">
                    <input
                        type="text"
                        placeholder="Tarefa"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="bg-input text-primary w-full mb-2 p-2 border rounded"
                    />
                    <textarea
                        placeholder="Descrição"
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="bg-input text-primary w-full mb-2 p-2 border rounded"
                    />
                    <Button
                        type="submit"
                        className="w-full p-2 rounded flex items-center justify-center"
                    >
                    {task ? "Salvar" : "Adicionar"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
        
    );

}