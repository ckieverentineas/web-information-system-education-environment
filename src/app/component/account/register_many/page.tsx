"use client";
import { useState } from 'react';

type Account = {
    className: string;
    role: string;
    count: number;
};

const roles = ['учитель', 'администратор', 'студент']; // Пример ролей

const CreateAccounts = () => {
    const [accounts, setAccounts] = useState<Account[]>([{ className: '', role: roles[0], count: 1 }]);
    const [isLoading, setIsLoading] = useState(false);
    const [downloadLink, setDownloadLink] = useState<string | null>(null);

    const handleChange = (index: number, e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const newAccounts = [...accounts];
        const { name, value } = e.target;

        if (name === 'role') {
            newAccounts[index].role = value;
        } else if (name === 'count') {
            newAccounts[index].count = parseInt(value) || 0; // Убедимся, что значение - это число
        } else if (name === 'className') {
            newAccounts[index].className = value; // Обновляем класс
        }

        setAccounts(newAccounts);
    };

    const handleAddAccount = () => {
        setAccounts([...accounts, { className: '', role: roles[0], count: 1 }]);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setDownloadLink(null); // Сбросить ссылку на скачивание

        // Формируем массив аккаунтов для отправки на сервер
        const accountsToCreate = accounts.flatMap((account) =>
            Array.from({ length: account.count }, () => ({ className: account.className, role: account.role }))
        );

        const response = await fetch('/api/account/register_many', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accounts: accountsToCreate }),
        });

        const result = await response.json();
        setIsLoading(false); // Завершить загрузку
        if (response.ok) {
            setDownloadLink(result.filePath); // Установить ссылку на скачивание
        } else {
            alert(`Ошибка: ${result.message}`);
        }
    };

    return (
        <div>
            <h1>Создание аккаунтов</h1>
            <form onSubmit={handleSubmit}>
                {accounts.map((account, index) => (
                    <div key={index}>
                        <select
                            name="role"
                            value={account.role}
                            onChange={(e) => handleChange(index, e)}
                            required
                        >
                            {roles.map((role) => (
                                <option key={role} value={role}>
                                    {role}
                                </option>
                            ))}
                        </select>
                        <input
                            type="text"
                            name="className"
                            placeholder="Класс"
                            value={account.className}
                            onChange={(e) => handleChange(index, e)}
                            required
                        />
                        <input
                            type="number"
                            name="count"
                            placeholder="Количество"
                            value={account.count}
                            onChange={(e) => handleChange(index, e)}
                            min="1"
                            required
                        />
                    </div>
                ))}
                <button type="button" onClick={handleAddAccount}>
                    Добавить аккаунт
                </button>
                <button type="submit" disabled={isLoading}>
                    Создать аккаунты
                </button>
            </form>

            {isLoading && <div className="loading">Создание аккаунтов, пожалуйста подождите...</div>}

            {downloadLink && (
                <div>
                    <a href={downloadLink} className="download-button">Скачать файл</a>
                </div>
            )}
        </div>
    );
};

export default CreateAccounts;
