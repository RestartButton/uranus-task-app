import { NextResponse } from "next/server";
import axios from "@/lib/axios";

export async function POST(req) {
    try {
        const { name, email, password } = await req.json();

        await axios.post("/auth/register", {
            "name": name,
            "email": email,
            "password": password
        });

        return NextResponse.json({ message: "Usuário registrado com sucesso!", }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Erro ao registrar usuário." }, { status: 500 });
    }
}