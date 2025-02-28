'use client';

import { signOut } from "next-auth/react";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function LogoutButton() {

    return (
        <Button className="bg-red-500 hover:bg-red-600" onClick={() => signOut()}>
            <LogOut />
            Sair
        </Button>
    );
}