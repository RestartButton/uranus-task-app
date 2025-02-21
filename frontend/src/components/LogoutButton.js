'use client';

import { useAuth } from "@/context/AuthContext";
import { Button } from "./ui/button";

export default function LogoutButton() {
    const { logout } = useAuth();

    return (
        <Button className="bg-red-500 hover:bg-red-600" onClick={logout}>
            Sair
        </Button>
    );
}