import React, { useEffect, useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import ChoiceForm from '../ChoiceForm/page';

const QuestionForm: React.FC<{ onQuestionAdded: () => void; editingQuestion?: any; quizId: number }> = ({
    onQuestionAdded,
    editingQuestion,
    quizId
}) => {
    const [text, setText] = useState<string>('');
    const [correctAnswer, setCorrectAnswer] = useState<string>('');
    const [isMultipleChoice, setIsMultipleChoice] = useState<boolean>(false);
    const [choices, setChoices] = useState<any[]>([]); // Массив для хранения вариантов ответов

    useEffect(() => {
        if (editingQuestion) {
            setText(editingQuestion.text);
            setCorrectAnswer(editingQuestion.correctAnswer);
            setIsMultipleChoice(Boolean(editingQuestion.choices && editingQuestion.choices.length > 0));
            setChoices(editingQuestion.choices || []);
        } else {
            setText('');
            setCorrectAnswer('');
            setIsMultipleChoice(false);
            setChoices([]);
        }
    }, [editingQuestion]);

    const handleChoiceAdded = (choice: any) => {
        setChoices([...choices, choice]); // Добавляем новый вариант ответа в массив
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const method = editingQuestion ? 'PUT' : 'POST';
        const url = editingQuestion ? `/api/task/question?id=${editingQuestion.id}` : `/api/task/question`;

        await fetch(url, {
            method,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, correctAnswer, quizId, isMultipleChoice, choices }),
        });

        setText('');
        setCorrectAnswer('');
        setIsMultipleChoice(false);
        setChoices([]);
        onQuestionAdded();
    };

    return (
        <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
            <Typography variant="h6">{editingQuestion ? 'Редактировать вопрос' : 'Добавить вопрос'}</Typography>
            <TextField
                label="Текст вопроса"
                variant="outlined"
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            {!isMultipleChoice && (
                <TextField
                    label="Правильный ответ (текстовый)"
                    variant="outlined"
                    value={correctAnswer}
                    onChange={(e) => setCorrectAnswer(e.target.value)}
                    required
                />
            )}
            <Button type="button" onClick={() => setIsMultipleChoice(!isMultipleChoice)}>
                {isMultipleChoice ? 'Сделать текстовым' : 'Использовать варианты ответа'}
            </Button>

            {isMultipleChoice && (
                <div>
                    <h3>Добавить варианты ответов:</h3>
                    <ChoiceForm 
                    questionId={editingQuestion?.id}
                    onChoiceAdded={handleChoiceAdded} 
                />
                </div>
            )}

            <Button variant="contained" type="submit">{editingQuestion ? 'Обновить' : 'Создать'}</Button>
        </form>
    );
};

export default QuestionForm;
