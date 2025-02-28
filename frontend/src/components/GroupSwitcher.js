'use client'

import { useState, useEffect } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { Check, ChevronsUpDown, Group, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { getGroups, createGroup } from "@/services/api";

export function GroupSwitcher({ activeGroup, setActiveGroup }) {
    const { isMobile } = useSidebar();
    const [groups, setGroups] = useState([]);
    const [newGroup, setNewGroup] = useState("");
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        async function fetchGroups () {
            const data = await getGroups();
            setGroups(data);
        }
        fetchGroups();
    }, []);

    const handleSubmit = async () => {
        const res = await createGroup({ Name: newGroup });
        const id = res.groupDto.id;
        const name = res.groupDto.name;
        setGroups([...groups, { id, name }]);
        setIsOpen(false);
        setNewGroup("");
    }

    if(!groups || groups.length <= 0)
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <Dialog open={isOpen} onOpenChange={setIsOpen}>
                        <DialogTrigger asChild>
                            <SidebarMenuButton onClick={()=>{ setIsOpen(true) }}>
                                <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                    <Plus className="size-4" />
                                </div>
                                <div className="font-medium text-muted-foreground">Criar Grupo</div>
                            </SidebarMenuButton>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle className="text-primary">Novo Grupo</DialogTitle>
                            </DialogHeader>
                            <div className="flex justify-center space-x-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="newGroupName" className="sr-only">Nome</Label>
                                    <Input
                                        id="newGroupName"
                                        placeholder="Novo Grupo"
                                        className="text-primary w-full mb-2 p-2 border rounded"
                                        value={newGroup}
                                        onChange={(e)=>{ setNewGroup(e.target.value) }}
                                    />
                                </div>
                                <Button type="submit" onClick={handleSubmit} size="sm" className="px-3">
                                    <span className="sr-only">Create</span>
                                    <Check />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </SidebarMenuItem>
            </SidebarMenu>
        );  
    else if (!activeGroup)
        setActiveGroup(groups[0]);

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuButton>
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                    AG
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span>{activeGroup?.name}</span>
                                </div>
                                <ChevronsUpDown className="ml-auto" />
                            </SidebarMenuButton>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                            align="start"
                            side={isMobile ? "bottom" : "right"}
                            sideOffset={4}
                        >
                            <DropdownMenuLabel className="text-xs text-muted-foreground">Grupos</DropdownMenuLabel>
                            {groups.map((group) => (
                                <DropdownMenuItem key={group.name}
                                    onClick={() => setActiveGroup(group)}
                                >
                                    <Group />
                                    {group.name}
                                </DropdownMenuItem>
                            ))}
                            <DropdownMenuSeparator />
                            <DialogTrigger asChild>
                                <DropdownMenuItem onClick={()=>{ setIsOpen(true) }}>
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Criar Grupo</div>
                                </DropdownMenuItem>
                            </DialogTrigger>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                            <DialogTitle className="text-primary">Novo Grupo</DialogTitle>
                        </DialogHeader>
                        <div className="flex justify-center space-x-2">
                            <div className="grid flex-1 gap-2">
                                <Label htmlFor="newGroupName" className="sr-only">Nome</Label>
                                <Input
                                    id="newGroupName"
                                    placeholder="Novo Grupo"
                                    className="text-primary w-full mb-2 p-2 border rounded"
                                    value={newGroup}
                                    onChange={(e)=>{ setNewGroup(e.target.value) }}
                                />
                            </div>
                            <Button type="submit" onClick={handleSubmit} size="sm" className="px-3">
                                <span className="sr-only">Create</span>
                                <Check />
                            </Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}