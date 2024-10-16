import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const ChapterForm: React.FC<{ onChapterAdded: () => void; editingChapter?: any, courseId: number }> = ({ onChapterAdded, editingChapter, courseId }) => {
    const [title, setTitle] = useState<string>('');
    const [order, setOrder] = useState<number>(0);

    useEffect(() => {
        if (editingChapter) {
            setTitle(editingChapter.title);
            setOrder(editingChapter.order);
        } else {
            setTitle('');
            setOrder(0);
        }
    }, [editingChapter]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingChapter ? 'PUT' : 'POST';
        const url = editingChapter ? `/api/task/chapter?id=${editingChapter.id}` : `/api/task/chapter`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, order, id_course: courseId }),
        });

        setTitle('');
        setOrder(0);
        onChapterAdded();
    };

    const handleDelete = async () => {
        if (editingChapter) {
            await fetch(`/api/task/chapter?id=${editingChapter.id}`, { method: 'DELETE' });
            onChapterAdded();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <Typography variant="h6">{editingChapter ? 'Редактировать главу' : 'Добавить главу'}</Typography>
            <TextField
                label="Название главы"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="Порядок"
                type="number"
                variant="outlined"
                value={order}
                onChange={(e) => setOrder(Number(e.target.value))}
                required
            />
            <Button variant="contained" type="submit">{editingChapter ? 'Обновить' : 'Создать'}</Button>
            {editingChapter && (
                <Button variant="outlined" onClick={handleDelete} color="error" style={{ marginLeft: '10px' }}>
                    Удалить
                </Button>
            )}
        </form>
    );
};

export default ChapterForm;
