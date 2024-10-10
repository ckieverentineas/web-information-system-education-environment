import { NextResponse } from 'next/server';
import prisma from '@/app/module/prisma_client';
import { hash } from 'bcryptjs'; // Используем bcrypt для шифрования паролей

// Функция для генерации логина
function generateLogin(className: string, index: number): string {
    return `${className.toLowerCase()}_user${index}`;
}

// Функция для генерации пароля
function generatePassword(length: number): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    return password;
}

export async function POST(request: Request) {
    const { className, role } = await request.json();

    // Проверка на пустые значения
    if (!className || !role) {
        return NextResponse.json({ message: 'Класс и роль обязательны' }, { status: 400 });
    }

    // Проверка на существование пользователя
    const accountsCount = await prisma.account.count();
    const login = generateLogin(className, accountsCount + 1);
    const password = generatePassword(12); // Генерация пароля длиной 12 символов

    // Шифруем пароль
    const encryptedPassword = await hash(password, 10);

    // Создание нового пользователя
    const newUser = await prisma.account.create({
        data: {
            login,
            password: encryptedPassword,
            class: className,
            role,
        },
    });

    // Возвращаем сообщение с логином и паролем нового пользователя
    return NextResponse.json(
        {
            message: 'Регистрация успешна',
            user: { 
                login, 
                password, // Возвращаем нешифрованный пароль
                class: className, 
                role 
            }
        }, 
        { status: 201 }
    );
}
