'use client'

import { useEffect, useState } from "react";
import { CategoryList } from "./CategoryList";
import { GroupSwitcher } from "./GroupSwitcher";
import { NavUser } from "./NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar";
import { getGroups } from "@/services/groupsApi";

export function  AppSidebar() {
    const [groups, setGroups] = useState([]);
    
    useEffect(() => {
        async function fetchGroups () {
            const data = await getGroups();
            setGroups(data);
        }
        fetchGroups();
    }, []);

    return (
        <Sidebar>
            <SidebarHeader>
                <GroupSwitcher groups={groups} setGroups={setGroups} />
            </SidebarHeader>
            <SidebarContent>
                <CategoryList items={[{ title: 'Sem Categoria' }]} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    )
}