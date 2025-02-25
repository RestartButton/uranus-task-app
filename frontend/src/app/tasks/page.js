'use client'

import React, { useState } from 'react';
import TaskList from '@/components/TaskList';
import { Button } from "@/components/ui/button";
import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogClose, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import TaskForm from '@/components/TaskForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import LogoutButton from "@/components/LogoutButton";
import AuthGuard from "@/components/AuthGuard";

const Home = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(null);
    
    return (
        <AuthGuard authNeeded={true}>
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
                <h1 className="text-4xl font-bold text-primary text-center">Bem-vindo ao Gerenciador de Tarefas</h1>
                <Dialog open={isEditing}>
                    <DialogTrigger asChild>
                        <Button onClick={() => { setIsEditing(true) }}>Nova Tarefa</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-primary">Nova Tarefa</DialogTitle>
                        </DialogHeader>
                        <TaskForm onClose={() => { setIsEditing(false); setTask(null); }} task={task} />
                        <DialogFooter className="sm:justify-start">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary" onClick={() => { setIsEditing(false); setTask(null); }}>
                                Fechar
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
                <ScrollArea className="h-72 rounded-md border-none">
                    <TaskList onEdit={(task) => { setIsEditing(true); setTask(task); }} />
                </ScrollArea>
                <LogoutButton /> 
            </div>
        </AuthGuard>
    )
}

export default Home;