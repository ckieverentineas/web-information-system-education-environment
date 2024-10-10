import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    const { id } = await request.json();

    if (!id) {
        return NextResponse.json({ message: 'ID обязательный параметр' }, { status: 400 });
    }

    try {
        const account = await prisma.account.findUnique({
            where: { id },
        });

        if (!account) {
            return NextResponse.json({ message: 'Аккаунт не найден' }, { status: 404 });
        }

        return NextResponse.json(account, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: 'Ошибка при загрузке аккаунта' }, { status: 500 });
    }
}
