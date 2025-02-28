'use client'

import { CategoryList } from "./CategoryList";
import { GroupSwitcher } from "./GroupSwitcher";
import { NavUser } from "./NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from "./ui/sidebar";
import { useGroup } from "@/context/GroupContext";

export function  AppSidebar() {
    const { activeGroup, setActiveGroup } = useGroup();

    return (
        <Sidebar>
            <SidebarHeader>
                <GroupSwitcher activeGroup={activeGroup} setActiveGroup={setActiveGroup} />
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