'use client';

import { useState, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AuthGuard from "@/components/AuthGuard";

export default function LoginPage() {
    const router = useRouter();
    const { data, status } = useSession();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(data) {
            router.push("/");
        }
    }, [data, router]);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password }),
        });

        const data = await res.json();

        if(!res.ok) {
            setError(data.error || "Erro ao registrar");
            return;
        }

        const loginRes = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setName("");
        setEmail("");
        setPassword("");

        if(loginRes?.error) {
            setError("Registro feito, mas falha ao entrar. Faça login manualmente.");
        } else {
            router.push("/");
        }
    }

    if (status === "loading") 
        return <p>Carregando...</p>;

    return (
        <AuthGuard authNeeded={false}>
            <div className="h-screen flex flex-col items-center justify-center space-y-4">
                <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-xl shadow-md justify-center">
                    <h2 className="text-2xl font-semibold text-center text-primary">Registrar</h2>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            type="text"
                            className="text-primary"
                            placeholder="Nome"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                        <Input
                            type="email"
                            className="text-primary"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <Input
                            type="password"
                            className="text-primary"
                            placeholder="Senha"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <Button type="submit" className="w-full">
                            Cadastrar
                        </Button>
                    </form>
                </div>
            </div>
        </AuthGuard>
    );
}

