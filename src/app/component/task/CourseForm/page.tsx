import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const CourseForm: React.FC<{ onCourseAdded: () => void; editingCourse?: any, onDelete?: () => void }> = ({ onCourseAdded, editingCourse, onDelete }) => {
    const [title, setTitle] = useState<string>('');
    const [authorId, setAuthorId] = useState<number>(0);

    useEffect(() => {
        if (editingCourse) {
            setTitle(editingCourse.title);
            setAuthorId(editingCourse.authorId);
        } else {
            setTitle('');
            setAuthorId(0);
        }
    }, [editingCourse]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingCourse ? 'PUT' : 'POST';
        const url = editingCourse ? `/api/task/course?id=${editingCourse.id}` : '/api/task/course';

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, authorId }),
        });

        setTitle('');
        setAuthorId(0);
        onCourseAdded();
    };

    const handleDelete = async () => {
        if (editingCourse) {
            await fetch(`/api/task/course?id=${editingCourse.id}`, { method: 'DELETE' });
            onDelete && onDelete();
            onCourseAdded();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <Typography variant="h6">{editingCourse ? 'Редактировать курс' : 'Добавить курс'}</Typography>
            <TextField
                label="Название курса"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <TextField
                label="ID автора"
                type="number"
                variant="outlined"
                value={authorId}
                onChange={(e) => setAuthorId(Number(e.target.value))}
                required
            />
            <Button variant="contained" type="submit">{editingCourse ? 'Обновить' : 'Создать'}</Button>
            {editingCourse && (
                <Button variant="outlined" onClick={handleDelete} color="error" style={{ marginLeft: '10px' }}>
                    Удалить
                </Button>
            )}
        </form>
    );
};

export default CourseForm;
