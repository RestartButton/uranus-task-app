'use client'

import { useGroup } from "@/context/GroupContext";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from "./ui/sidebar";
import { Check, ChevronsUpDown, Group, Plus } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export function GroupSwitcher({ groups }) {
    const { isMobile } = useSidebar;
    const { activeGroup, setActiveGroup } = useGroup();

    if(!groups || groups.length === 0)
        return (
            <SidebarMenu>
                <SidebarMenuItem>
                    <Dialog>
                        <DialogTrigger asChild>
                            <SidebarMenuButton>
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
                                    />
                                </div>
                                <Button type="submit" size="sm" className="px-3">
                                    <span className="sr-only">Create</span>
                                    <Check />
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                </SidebarMenuItem>
            </SidebarMenu>
        );

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                AG
                            </div>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span>{activeGroup.name}</span>
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
                        <Dialog>
                            <DialogTrigger asChild>
                                <DropdownMenuItem>
                                    <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                                        <Plus className="size-4" />
                                    </div>
                                    <div className="font-medium text-muted-foreground">Criar Grupo</div>
                                </DropdownMenuItem>
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
                                        />
                                    </div>
                                    <Button type="submit" size="sm" className="px-3">
                                        <span className="sr-only">Create</span>
                                        <Check />
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}