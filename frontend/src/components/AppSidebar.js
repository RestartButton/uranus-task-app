import { CategoryList } from "./CategoryList";
import { GroupSwitcher } from "./GroupSwitcher";
import { NavUser } from "./NavUser";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";

export function  AppSidebar() {
    

    return (
        <Sidebar>
            <SidebarHeader>
                <GroupSwitcher />
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