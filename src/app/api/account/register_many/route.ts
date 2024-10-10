import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import { writeFileSync } from 'fs';
import { join } from 'path';
import prisma from '@/app/module/prisma_client';
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
    const { accounts } = await request.json(); // accounts — массив объектов с className и role

    // Проверка на наличие аккаунтов в запросе
    if (!Array.isArray(accounts) || accounts.length === 0) {
        return NextResponse.json({ message: 'Необходимо передать массив аккаунтов' }, { status: 400 });
    }

    const createdUsers = [];

    for (const account of accounts) {
        const { className, role } = account;

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

        createdUsers.push({ login, password, class: className, role });
    }

    // Создание текстового файла с созданными аккаунтами
    const fileData = createdUsers.map(user => 
        `Логин: ${user.login}, Пароль: ${user.password}, Класс: ${user.class}, Роль: ${user.role}`
    ).join('\n');

    const filePath = join(process.cwd(), 'public', 'created_accounts.txt');
    writeFileSync(filePath, fileData);

    return NextResponse.json(
        {
            message: 'Регистрация аккаунтов успешна',
            users: createdUsers,
            filePath: '/created_accounts.txt' // Путь к файлу
        },
        { status: 201 }
    );
}
