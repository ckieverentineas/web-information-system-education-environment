import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

// Получение всех курсов
export async function GET() {
    const courses = await prisma.course.findMany({
        include: {
            author: true, // Включение информации об авторе
            Chapter: true,
        },
    });
    return NextResponse.json(courses);
}

// Создание нового курса
export async function POST(request: Request) {
    const { title, authorId } = await request.json();
    
    if (!title || !authorId) {
        return NextResponse.json({ error: 'Название и ID автора обязательны' }, { status: 400 });
    }

    const newCourse = await prisma.course.create({
        data: { title, authorId },
    });
    return NextResponse.json(newCourse, { status: 201 });
}

// Обновление курса
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID не предоставлен' }, { status: 400 });
    }

    const { title, authorId } = await request.json();

    if (!title || !authorId) {
        return NextResponse.json({ error: 'Название и ID автора обязательны' }, { status: 400 });
    }

    const updatedCourse = await prisma.course.update({
        where: { id: Number(id) },
        data: { title, authorId },
    });

    return NextResponse.json(updatedCourse);
}

// Удаление курса
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ error: 'ID не предоставлен' }, { status: 400 });
    }

    await prisma.course.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 });
}
