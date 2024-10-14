import prisma from '@/app/module/prisma_client';
import { NextResponse } from 'next/server';


export async function GET(request: Request) {
    const news = await prisma.news.findMany({
      include: {
        author: true, // добавляем информацию об авторе
      },
    });
    return NextResponse.json(news);
  }
  
  export async function POST(request: Request) {
    const { title, content, authorId } = await request.json();
    const newNews = await prisma.news.create({
      data: { title, content, authorId },
    });
    return NextResponse.json(newNews, { status: 201 });
  }
  
  export async function PUT(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Извлекаем id из параметров URL
  
    if (!id) {
      return NextResponse.json({ error: 'ID не предоставлен' }, { status: 400 });
    }
  
    const { title, content } = await request.json();
    
    const updatedNews = await prisma.news.update({
      where: { id: Number(id) },
      data: { title, content },
    });
  
    return NextResponse.json(updatedNews);
  }
  
  export async function DELETE(request: Request) {
    const url = new URL(request.url);
    const id = url.searchParams.get('id'); // Извлекаем id из параметров URL
  
    if (!id) {
      return NextResponse.json({ error: 'ID не предоставлен' }, { status: 400 });
    }
  
    await prisma.news.delete({
      where: { id: Number(id) },
    });
  
    return NextResponse.json({}, { status: 204 });
  }