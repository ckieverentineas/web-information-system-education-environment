import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';

// Получение всех глав для конкретного курса
export async function GET(request: Request) {
    const url = new URL(request.url);
    const courseId = url.searchParams.get('courseId');

    if (!courseId) {
        return NextResponse.json({ error: 'courseId не предоставлен' }, { status: 400 });
    }

    const chapters = await prisma.chapter.findMany({
        where: {
            id_course: Number(courseId),
        },
    });

    return NextResponse.json(chapters);
}

// Создание новой главы
export async function POST(request: Request) {
    const { title, id_course, order } = await request.json();
    const newChapter = await prisma.chapter.create({
        data: { title, id_course, order },
    });
    return NextResponse.json(newChapter, { status: 201 });
}

// Обновление главы
export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    const { title, id_course, order } = await request.json();

    const updatedChapter = await prisma.chapter.update({
        where: { id: Number(id) },
        data: { title, id_course, order },
    });

    return NextResponse.json(updatedChapter);
}

// Удаление главы
export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    await prisma.chapter.delete({
        where: { id: Number(id) },
    });

    return NextResponse.json({}, { status: 204 });
}
