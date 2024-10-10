const AchievementsPage = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>Новости</li>
                        <li>Мои задания</li>
                        <li className="active">Мои достижения</li>
                        <li>®</li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>МОИ ДОСТИЖЕНИЯ</h1>
                <div>
                    <h2>Шкала прохождения курса</h2>
                    <div>
                        <h3>РАЗДЕЛ 1</h3>
                        <div style={{ width: '40%', backgroundColor: 'lightblue' }}>40%</div>
                        <h3>Тема 1</h3>
                        <div style={{ width: '100%', backgroundColor: 'lightgreen' }}>100%</div>
                        <h3>Тема 2</h3>
                        <div style={{ width: '90%', backgroundColor: 'lightgreen' }}>90%</div>
                        <h3>Тема 3</h3>
                        <div style={{ width: '0%', backgroundColor: 'lightgray' }}>0%</div>
                        <h3>Тема 4</h3>
                        <div style={{ width: '0%', backgroundColor: 'lightgray' }}>0%</div>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default AchievementsPage