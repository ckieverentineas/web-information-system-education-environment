import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

// Получение всех вариантов ответов для вопроса
export async function GET(request: Request) {
    const url = new URL(request.url);
    const questionId = url.searchParams.get('questionId');

    if (!questionId) {
        return NextResponse.json({ error: 'ID вопроса не указан' }, { status: 400 });
    }

    const choices = await prisma.choice.findMany({
        where: { questionId: Number(questionId) },
    });

    return NextResponse.json(choices);
}

// Создание нового варианта ответа
export async function POST(request: Request) {
    const { text, isCorrect, questionId } = await request.json();

    if (!text || questionId === undefined) {
        return NextResponse.json({ error: 'Текст варианта ответа и ID вопроса обязательны' }, { status: 400 });
    }

    const newChoice = await prisma.choice.create({
        data: {
            text,
            isCorrect,
            questionId: Number(questionId),
        },
    });

    return NextResponse.json(newChoice, { status: 201 });
}

// Обновление существующего варианта ответа
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID варианта ответа не указан' }, { status: 400 });
    }

    const { text, isCorrect } = await request.json();

    if (!text) {
        return NextResponse.json({ error: 'Текст варианта ответа обязателен' }, { status: 400 });
    }

    const updatedChoice = await prisma.choice.update({
        where: { id: Number(id) },
        data: { text, isCorrect },
    });

    return NextResponse.json(updatedChoice);
}

// Удаление варианта ответа
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID варианта ответа не указан' }, { status: 400 });
    }

    await prisma.choice.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 });
}
