import { AppSidebar } from "@/components/AppSidebar";
import AuthGuard from "@/components/AuthGuard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { GroupProvider } from "@/context/GroupContext";

export default function AuthLayout({ children }) {
    return (
        <AuthGuard authNeeded={true}>
            <GroupProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <main>
                        <SidebarTrigger />
                        {children}
                    </main>
                </SidebarProvider>
            </GroupProvider>
        </AuthGuard>
    );
}