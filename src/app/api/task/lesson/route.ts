import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

// Получение всех уроков для конкретной главы
export async function GET(request: Request) {
    const url = new URL(request.url);
    const chapterId = url.searchParams.get('chapterId'); // Извлекаем chapterId из параметров URL

    if (!chapterId) {
        return NextResponse.json({ error: 'chapterId не предоставлен' }, { status: 400 });
    }

    // Пытаемся преобразовать chapterId в число
    const parsedChapterId = Number(chapterId);
    if (isNaN(parsedChapterId)) {
        return NextResponse.json({ error: 'chapterId должен быть числом' }, { status: 400 });
    }

    try {
        const lessons = await prisma.lesson.findMany({
            where: {
                id_chapter: parsedChapterId, // Убедитесь, что вы ссылаетесь на правильный атрибут в модели
            },
        });
        return NextResponse.json(lessons);
    } catch (error) {
        console.error('Ошибка при получении уроков:', error);
        return NextResponse.json({ error: 'Ошибка при получении уроков' }, { status: 500 });
    }
}

// Создание нового урока
export async function POST(request: Request) {
    const { title, videoUrl, theory, task, correct_task, id_chapter } = await request.json();

    if (!id_chapter) {
        return NextResponse.json({ error: 'id_chapter не предоставлен' }, { status: 400 });
    }

    try {
        const newLesson = await prisma.lesson.create({
            data: { title, videoUrl, theory, task, correct_task, id_chapter },
        });
        return NextResponse.json(newLesson, { status: 201 });
    } catch (error) {
        console.error('Ошибка при создании урока:', error);
        return NextResponse.json({ error: 'Ошибка при создании урока' }, { status: 500 });
    }
}

// Обновление урока
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID не предоставлен' }, { status: 400 });
    }

    const { title, videoUrl, theory, task, correct_task, id_chapter } = await request.json();

    try {
        const updatedLesson = await prisma.lesson.update({
            where: { id: Number(id) },
            data: { title, videoUrl, theory, task, correct_task, id_chapter },
        });
        return NextResponse.json(updatedLesson);
    } catch (error) {
        console.error('Ошибка при обновлении урока:', error);
        return NextResponse.json({ error: 'Ошибка при обновлении урока' }, { status: 500 });
    }
}

// Удаление урока
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID не предоставлен' }, { status: 400 });
    }

    try {
        await prisma.lesson.delete({
            where: { id: Number(id) },
        });
        return NextResponse.json({}, { status: 204 });
    } catch (error) {
        console.error('Ошибка при удалении урока:', error);
        return NextResponse.json({ error: 'Ошибка при удалении урока' }, { status: 500 });
    }
}
