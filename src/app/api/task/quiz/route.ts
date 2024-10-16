import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

// Получение всех квизов для конкретного урока
export async function GET(request: Request) {
    const url = new URL(request.url);
    const lessonId = url.searchParams.get('lessonId');

    if (!lessonId) {
        return NextResponse.json({ error: 'lessonId не предоставлен' }, { status: 400 });
    }

    const quizzes = await prisma.quiz.findMany({
        where: {
            id_lesson: Number(lessonId),
        },
    });

    return NextResponse.json(quizzes);
}

// Создание нового квиза
export async function POST(request: Request) {
    const { title, id_lesson } = await request.json();
    const newQuiz = await prisma.quiz.create({
        data: { title, id_lesson },
    });
    return NextResponse.json(newQuiz, { status: 201 });
}

// Обновление квиза
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const { title, id_lesson } = await request.json();

    const updatedQuiz = await prisma.quiz.update({
        where: { id: Number(id) },
        data: { title, id_lesson },
    });

    return NextResponse.json(updatedQuiz);
}

// Удаление квиза
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    await prisma.quiz.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 });
}
