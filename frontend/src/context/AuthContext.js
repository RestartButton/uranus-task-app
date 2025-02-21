'use client';

import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if(token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
            axios.get("/auth/me")
                .then((response) => {
                    setUser(response.data);
                })
                .catch(() => {
                    logout();
                });
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        try {
            const response = await axios.post("/auth/login", { email, password });
            localStorage.setItem("token", response.data.token);
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
            setUser(response.data.user);
            router.push("/tasks");
        } catch (error) {
            console.error("Erro ao fazer login ", error);
            throw new Error("Credenciais inválidos");
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        delete axios.defaults.headers.common["Authorization"];
        router.push("/login");
    }

    return (
        <AuthContext.Provider value={{ user, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}