'use client';

import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { register, user } = useAuth();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    if(user) router.push("/tasks");
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setName("");
        setEmail("");
        setPassword("");
        try {
            await register(name, email, password);
        } catch (err) {
            setError("Não foi possível realizar o cadastro, verifique suas informações.");
        }
    }

    return (
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
    );
}

