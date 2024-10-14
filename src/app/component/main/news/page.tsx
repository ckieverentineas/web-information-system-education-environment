"use client";
import { useEffect, useState } from 'react';

interface NewsItem {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  authorId: number;
}

interface Account {
  id: number;       // ID аккаунта
  role: string;     // Роль пользователя
}

const News = ({ account }: { account: { id: number, login: string, class: string, role: string } | null }) => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => setNews(data));
  }, []);

  const addNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/news', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, authorId: account?.id }), // Указываем authorId
    });
    const newNewsItem = await response.json();
    setNews((prev) => [...prev, newNewsItem]);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  const editNews = (id: number) => {
    const newsItem = news.find((item) => item.id === id);
    if (newsItem) {
      setTitle(newsItem.title);
      setContent(newsItem.content);
      setEditingId(id);
    }
  };

  const updateNews = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const response = await fetch(`/api/news?id=${editingId}`, { // Используем query параметр id
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    
    if (!response.ok) {
      const errorText = await response.text(); // Получаем текст ошибки для отладки
      console.error('Ошибка обновления:', errorText);
      return; // Вы можете добавить обработку ошибок здесь
    }
    
    const updatedNewsItem = await response.json();
    setNews((prev) =>
      prev.map((item) => (item.id === updatedNewsItem.id ? updatedNewsItem : item))
    );
    resetForm();
  };

  const deleteNews = async (id: number) => {
    const response = await fetch(`/api/news?id=${id}`, { // Используем query параметр id
      method: 'DELETE',
    });
  
    if (!response.ok) {
      const errorText = await response.text(); // Получаем текст ошибки для отладки
      console.error('Ошибка удаления:', errorText);
      return; // Здесь можно добавить дополнительную обработку ошибок
    }
  
    setNews((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Новости</h1>
      {account?.role !== 'ученик' && (
        <form onSubmit={editingId ? updateNews : addNews}>
          <input
            type="text"
            placeholder="Название новости"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Содержание новости"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <button type="submit">{editingId ? 'Сохранить' : 'Добавить новость'}</button>
        </form>
      )}
      <div className="news-container">
        {news.map((item) => (
          <div key={item.id} className="news-item">
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            <small>{new Date(item.createdAt).toLocaleString()}</small>
            {item.authorId === account?.id || account?.role === 'администратор' ? ( // Проверка прав доступа
              <div className="news-buttons">
                <button onClick={() => editNews(item.id)}>Редактировать</button>
                <button onClick={() => deleteNews(item.id)}>Удалить</button>
              </div>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default News;
