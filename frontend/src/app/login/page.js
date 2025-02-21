'use client';

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login, user } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    useEffect(() => {
        if(user) {
            router.push("/tasks");
        }
    }, [user, router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await login(email, password);
        } catch (err) {
            setError("Erro ao fazer login, verifique suas credenciais.");
        }
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center space-y-4">
            <div className="w-full max-w-md p-8 space-y-6 bg-secondary rounded-xl shadow-md justify-center">
                <h2 className="text-2xl font-semibold text-center text-primary">Login</h2>
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-4">
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
                        Entrar
                    </Button>
                </form>
                <div className="w-full flex justify-center items-center">
                    <Button className=" bg-orange-500 hover:bg-orange-600 text-white" variant="secondary">
                        Cadastrar
                    </Button>
                </div>
            </div>
        </div>
    );
}

