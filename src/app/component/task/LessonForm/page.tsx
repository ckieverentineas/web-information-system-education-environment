import React, { useEffect, useState } from 'react';

interface LessonFormProps {
    onLessonAdded: () => void;
    editingLesson?: any;
    chapterId: number; // Добавлено свойство chapterId
}

const LessonForm: React.FC<LessonFormProps> = ({ onLessonAdded, editingLesson, chapterId }) => {
    const [title, setTitle] = useState<string>('');

    useEffect(() => {
        if (editingLesson) {
            setTitle(editingLesson.title);
        } else {
            setTitle('');
        }
    }, [editingLesson]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const method = editingLesson ? 'PUT' : 'POST';
            const url = editingLesson ? `/api/task/lesson?id=${editingLesson.id}` : '/api/task/lesson';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ title, id_chapter: chapterId }), // Используем chapterId вместо courseId
            });

            if (!response.ok) {
                throw new Error(editingLesson ? 'Ошибка при обновлении урока' : 'Ошибка при добавлении урока');
            }

            setTitle('');
            onLessonAdded(); // Уведомление о добавлении/обновлении урока
        } catch (error) {
            console.error('Ошибка:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>{editingLesson ? 'Редактировать урок' : 'Добавить урок'}</h2>
            <input
                type="text"
                placeholder="Название урока"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <button type="submit">{editingLesson ? 'Обновить урок' : 'Создать урок'}</button>
        </form>
    );
};

export default LessonForm;
