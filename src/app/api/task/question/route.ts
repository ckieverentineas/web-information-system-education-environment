import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

// Получение всех вопросов по ID викторины
export async function GET(request: Request) {
    const url = new URL(request.url);
    const quizId = url.searchParams.get('quizId');

    if (!quizId) {
        return NextResponse.json({ error: 'ID викторины не указан' }, { status: 400 });
    }

    const questions = await prisma.question.findMany({
        where: { quizId: Number(quizId) },
        include: { choices: true }, // Включить варианты ответов
    });

    return NextResponse.json(questions);
}

// Создание нового вопроса
export async function POST(request: Request) {
    const { text, correctAnswer, quizId, choices } = await request.json();

    if (!text || !quizId) {
        return NextResponse.json({ error: 'Текст вопроса и ID викторины обязательны' }, { status: 400 });
    }

    const newQuestion = await prisma.question.create({
        data: {
            text,
            correctAnswer,
            quizId,
            choices: {
                create: choices, // Создаем варианты ответов
            },
        },
    });

    return NextResponse.json(newQuestion, { status: 201 });
}

// Обновление существующего вопроса
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID вопроса не указан' }, { status: 400 });
    }

    const { text, correctAnswer, choices } = await request.json();

    if (!text) {
        return NextResponse.json({ error: 'Текст вопроса обязательный' }, { status: 400 });
    }

    // Обновление вопроса
    const updatedQuestion = await prisma.question.update({
        where: { id: Number(id) },
        data: { 
            text,
            correctAnswer,
        },
    });

    // Сначала удалим старые варианты ответов
    await prisma.choice.deleteMany({
        where: {
            questionId: Number(id),
        },
    });

    // Затем создадим новые варианты
    await prisma.choice.createMany({
        data: choices.map(choice => ({
            questionId: Number(id),
            text: choice.text,
            isCorrect: choice.isCorrect
        })),
    });

    return NextResponse.json(updatedQuestion);
}

// Удаление вопроса
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID вопроса не указан' }, { status: 400 });
    }

    await prisma.question.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 });
}
