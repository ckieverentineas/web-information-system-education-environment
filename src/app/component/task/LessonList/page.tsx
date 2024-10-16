import React, { useState } from 'react';

const LessonList: React.FC<{ lessons: any[]; onLessonEdit: (lesson: any) => void }> = ({ lessons, onLessonEdit }) => {
    return (
        <div>
            <h2>Список уроков</h2>
            <ul>
                {lessons.map(lesson => (
                    <li key={lesson.id}>
                        {lesson.title}
                        <button onClick={() => onLessonEdit(lesson)}>Редактировать</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LessonList;
