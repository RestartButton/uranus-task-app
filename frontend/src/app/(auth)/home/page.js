'use client'
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

const Home = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [task, setTask] = useState(null);
    
    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <h1 className="text-4xl font-bold text-primary text-center">Bem-vindo ao Gerenciador de Tarefas</h1>
            <TaskForm 
                onClose={(open) => { 
                    setIsEditing(open); 
                    if(!open)
                        setTask(null); 
                }} 
                task={task} 
                open={isEditing}
            />
            <ScrollArea className="h-72 rounded-md border-none">
                <TaskList onEdit={(task) => { setIsEditing(true); setTask(task); }} />
            </ScrollArea>
        </div>
    )
}

export default Home;