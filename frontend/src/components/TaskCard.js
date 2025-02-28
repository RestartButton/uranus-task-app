import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Pencil, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "./ui/switch";
import { editTask } from "@/services/tasksApi";

export default function TaskCard({ task, onDelete, onToggle, onEdit }) {
  return (
    <Card 
        className={cn(
            "relative w-full max-w-md border-accent shadow-md p-4 transition-all",
            task.isCompleted ? "border-green-900 bg-green-100" : "bg-background"
        )}
    >
        <button
            onClick={() => onDelete(task.id)}
            className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition"
        >
            <X size={20} />
        </button>
        <Switch
            checked={task.isCompleted}
            onCheckedChange={() => { onToggle(task.id); editTask({ ...task, isCompleted: !task.isCompleted }); }}
            className="absolute top-2 left-2"
        />
        <CardHeader>
            <CardTitle 
                onClick={() => onEdit(task)}
                className="text-primary cursor-pointer hover:underline flex items-center"
            >
                {task.title}
                <Pencil size={16} className="ml-2" />
            </CardTitle>
            <CardDescription>{task.description}</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-sm text-gray-400 mt-2">
                Status: {task.isCompleted ? "Concluída" : "Pendente"}
            </p>
        </CardContent>
    </Card>
  );
}