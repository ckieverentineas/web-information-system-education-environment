import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';

interface Choice {
    text: string;
    isCorrect: boolean;
}

interface ChoiceFormProps {
    questionId: any;  
    onChoiceAdded: (choice: Choice) => void;
}

const ChoiceForm: React.FC<ChoiceFormProps> = ({ questionId, onChoiceAdded }) => {
    const [choiceText, setChoiceText] = useState('');
    const [isCorrect, setIsCorrect] = useState(false);
    const [choices, setChoices] = useState<Choice[]>([]); // Чтобы хранить все варианты

    const handleAddChoice = () => {
        if (choiceText.trim() !== '') {
            const newChoice = { text: choiceText, isCorrect };
            setChoices([...choices, newChoice]); // Добавляем новый вариант в массив
            onChoiceAdded(newChoice); // Вызываем функцию добавления выбора
            setChoiceText(''); // Очищаем поле ввода
            setIsCorrect(false); // Сбрасываем чекбокс
        }
    };

    return (
        <div style={{ marginBottom: '1rem' }}>
            <TextField
                label="Текст варианта ответа"
                variant="outlined"
                value={choiceText}
                onChange={(e) => setChoiceText(e.target.value)}
                required
            />
            <label>
                <input
                    type="checkbox"
                    checked={isCorrect}
                    onChange={() => setIsCorrect(!isCorrect)}
                />
                Правильный вариант?
            </label>
            <Button variant="outlined" onClick={handleAddChoice} style={{ marginLeft: '10px' }}>
                Добавить вариант
            </Button>

            <div>
                <h4>Добавленные варианты:</h4>
                {choices.map((choice, index) => (
                    <div key={index}>
                        {choice.text} {choice.isCorrect && '(Правильный)'}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChoiceForm;
