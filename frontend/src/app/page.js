'use client'

import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default () => {
    const { data } = useSession();
    const router = useRouter();

    useEffect(() => {
        if(!data) {
            router.push("/login");
        } else {
            router.push("/tasks");
        }
    }, [data, router]);

    return <p className="text-center text-white">Carregando...</p>;
}