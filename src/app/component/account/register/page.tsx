"use client";
import './auth.css';
import Link from 'next/link';
import { useState } from 'react';

export default function RegisterOnePage() {
    const [className, setClassName] = useState('');
    const [role, setRole] = useState('учитель'); // Роль по умолчанию
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLogin('');
        setPassword('');

        if (!className) {
            setError('Пожалуйста, укажите класс.');
            return;
        }

        const response = await fetch('/api/account/register', { // Измените на путь к вашему API регистрации
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ className, role }),
        });

        const data = await response.json();
        if (response.ok) {
            setSuccess(String(data.message)); // Предполагаем, что в msg возвращается сообщение
            setLogin(data.user.login);
            setPassword(data.user.password);
        } else {
            setError(String(data.message));
        }
    };

    return (
        <div className="auth-container">
            <h1>Регистрация</h1>
            <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="className">Класс:</label>
                    <input 
                        type="text" 
                        id="className" 
                        value={className} 
                        onChange={(e) => setClassName(e.target.value)} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="role">Роль:</label>
                    <select 
                        id="role" 
                        value={role} 
                        onChange={(e) => setRole(e.target.value)} 
                        required
                    >
                        <option value="администратор">Администратор</option>
                        <option value="учитель">Учитель</option>
                        <option value="ученик">Ученик</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">Зарегистрироваться</button>
            </form>
            {error && <p className="error-message">{error}</p>}
            {success && (
                <div className="success-message">
                    <p>{success}</p>
                    <p>Ваш логин: <strong>{login}</strong></p>
                    <p>Ваш пароль: <strong>{password}</strong></p>
                </div>
            )}
            <p className="switch-page">
                Уже есть аккаунт? <Link href="/component/account/login">Войдите здесь</Link>
            </p>
            {success && (
                <Link href="/component/account/login" className="redirect-button">
                    Перейти к авторизации
                </Link>
            )}
        </div>
    );
}
