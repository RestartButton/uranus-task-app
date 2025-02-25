'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AuthGuard({ children, authNeeded }) {
    const { data, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status == "unauthenticated" == authNeeded) {
            router.push("/");
        }
    }, [status, router]);

    if (status == "loading") 
        return <p>Carregando...</p>
    
    if (!data != authNeeded) 
        return <>{children}</>;
    else   
        return <p></p>
}