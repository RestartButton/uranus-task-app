'use client'

import { useAuth } from "@/context/AuthContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default () => {
    const { user } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!user) {
            router.push("/login");
        } else {
            router.push("/tasks");
        }
    }, [user, router]);

    return <p className="text-center text-white">Carregando...</p>;
}