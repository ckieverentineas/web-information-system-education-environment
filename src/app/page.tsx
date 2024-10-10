// pages/index.tsx
import Link from 'next/link';

export default function HomePage() {
    return (
        <div className="home-container">
            <header className="header">
                <h1>Образовательная платформа обучения</h1>
                <p>Учиться онлайн просто и эффективно, как два пальца об асфальт</p>
            </header>
            <section className="features">
                <div className="feature">
                    <h2>Новости</h2>
                    <p>Будьте в курсе событий, не будьте белой вороной.</p>
                </div>
                <div className="feature">
                    <h2>Задания</h2>
                    <p>Отслеживание заданий, мониторинг прогресса обучения</p>
                </div>
                <div className="feature">
                    <h2>Достижения</h2>
                    <p>Достигайте большего, деградация тоже эволюция!</p>
                </div>
            </section>
            <section className="call-to-action">
                <Link href="/component/account/login" className="cta-button">Начать Обучение</Link>
            </section>
            <footer className="footer">
                <p>&copy; 2024 Мир Образования Онлайн. Все права защищены.</p>
            </footer>
        </div>
    );
}
