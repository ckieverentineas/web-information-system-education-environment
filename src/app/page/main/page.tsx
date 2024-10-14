"use client"
import News from "@/app/component/main/news/page";
import { useEffect, useState } from "react";

const MainPage = () => {
    const [account, setAccount] = useState<{ id: number, login: string, class: string, role: string } | null>(null);

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
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>Новости</li><News account={ account }></News>
                        <li className="active">Мои задания</li>
                        <li>Мои достижения</li>
                        <li>®</li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>Добро пожаловать!</h1>
                <p>Здесь будет информация о платформе.</p>
            </main>
        </div>
    );
};
export default MainPage