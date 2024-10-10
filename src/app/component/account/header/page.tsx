import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import DayNightTimer from '../../util/timer_day_and_night';

interface Account {
  id: number;
  login: string;
  class: string;
  role: string;
}

const Header = () => {
  const [account, setAccount] = useState<Account | null>(null);

  useEffect(() => {
    const idAccount = localStorage.getItem('id_account');
    if (idAccount) {
      fetchAccountById(idAccount);
    }
  }, []);

  const fetchAccountById = async (idAccount: string) => {
    try {
      const response = await fetch('/api/account/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: Number(idAccount) }),
      });
      
      if (!response.ok) throw new Error('Ошибка при загрузке аккаунта');
      
      const accountData = await response.json();
      if (accountData) {
        setAccount({
          id: accountData.id,
          login: accountData.login,
          class: accountData.class,
          role: accountData.role,
        });
      }
    } catch (error) {
      console.error('Ошибка при загрузке аккаунта:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('id_account'); // Удаляем идентификатор аккаунта
    setAccount(null); // Сбрасываем текущий аккаунт
    // Можно добавить перенаправление на страницу входа
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-800 text-white relative">
      <div className="flex items-center">
        <span className="font-bold">{account ? account.login : 'Гость'}</span>
        {account && (
          <span className="ml-2 text-gray-400">({account.class}, {account.role})</span>
        )}
      </div>

      <div className="flex items-center">
        <DayNightTimer />
        <button
          className="bg-gray-700 hover:bg-gray-600 py-2 px-4 rounded ml-4"
          onClick={handleLogout}
        >
          Выйти
        </button>
        {!account && (
          <Link href="/login" className="ml-4 text-gray-300">
            Войти
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
