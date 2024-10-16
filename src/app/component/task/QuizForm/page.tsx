import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';

const QuizForm: React.FC<{ onQuizAdded: () => void; editingQuiz?: any; lessonId: number }> = ({ onQuizAdded, editingQuiz, lessonId }) => {
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (editingQuiz) {
            setTitle(editingQuiz.title);
        } else {
            setTitle('');
        }
    }, [editingQuiz]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingQuiz ? 'PUT' : 'POST';
        const url = editingQuiz ? `/api/task/quiz?id=${editingQuiz.id}` : `/api/task/quiz`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, id_lesson: lessonId }),
        });

        setTitle('');
        onQuizAdded();
    };

    const handleDelete = async () => {
        if (editingQuiz) {
            await fetch(`/api/task/quiz?id=${editingQuiz.id}`, { method: 'DELETE' });
            onQuizAdded();
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <Typography variant="h6">{editingQuiz ? 'Редактировать викторину' : 'Добавить викторину'}</Typography>
            <TextField
                label="Название викторины"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <Button variant="contained" type="submit">{editingQuiz ? 'Обновить' : 'Создать'}</Button>
            {editingQuiz && (
                <Button variant="outlined" onClick={handleDelete} color="error" style={{ marginLeft: '10px' }}>
                    Удалить
                </Button>
            )}
        </form>
    );
};

export default QuizForm;
