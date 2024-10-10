import { NextResponse } from "next/server";
import prisma from "@/app/module/prisma_client";
import { compare } from 'bcryptjs'; // Импортируем функцию для сравнения хешей паролей

export async function POST(request: Request) {
    const { login, password } = await request.json(); // Используем 'login' вместо 'email'

    // Проверка на не null, не undefined и не пустую строку
    if (!login || typeof login !== 'string' || login.trim() === '') {
        return NextResponse.json({ message: 'Логин не может быть пустым' }, { status: 400 });
    }

    if (!password || typeof password !== 'string' || password.trim() === '') {
        return NextResponse.json({ message: 'Пароль не может быть пустым' }, { status: 400 });
    }

    const user = await prisma.account.findFirst({
        where: { login },
    });

    if (user) {
        const isPasswordValid = await compare(password, user.password); // Сравниваем введённый пароль с хэшом
        if (isPasswordValid) {
            return NextResponse.json({ message: 'Успешный вход', user: { id: user.id } }, { status: 200 }); // Отправляем только ID
        }
    }
    
    return NextResponse.json({ message: 'Неверный логин или пароль' }, { status: 401 });
}
