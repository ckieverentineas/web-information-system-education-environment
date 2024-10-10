const AssignmentsPage = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>Новости</li>
                        <li className="active">Мои задания</li>
                        <li>Мои достижения</li>
                        <li>®</li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>МОИ ЗАДАНИЯ</h1>
                <div>
                    <h2>Темы:</h2>
                    <div>
                        <h3>РАЗДЕЛ 1</h3>
                        <ul>
                            <li><a href="/topic1">Тема 1</a></li>
                            <li><a href="/topic2">Тема 2</a></li>
                            <li><a href="/topic3">Тема 3</a></li>
                            <li><a href="/topic4">Тема 4</a></li>
                        </ul>
                    </div>
                    <div>
                        <h3>РАЗДЕЛ 2</h3>
                        {/* Здесь будут темы раздела 2 */}
                    </div>
                    <div>
                        <h3>РАЗДЕЛ 3</h3>
                        {/* Здесь будут темы раздела 3 */}
                    </div>
                    <div>
                        <h3>РАЗДЕЛ 4</h3>
                        {/* Здесь будут темы раздела 4 */}
                    </div>
                </div>
            </main>
        </div>
    );
};

const TopicPage = () => {
    return (
        <div>
            <header>
                <nav>
                    <ul>
                        <li>Новости</li>
                        <li>Мои задания</li>
                        <li>Мои достижения</li>
                        <li>®</li>
                    </ul>
                </nav>
            </header>
            <main>
                <h1>РАЗДЕЛ 1</h1>
                <h2>ТЕМА 1</h2>
                <div>
                    <h3>ВИДЕЛЕКЦИЯ</h3>
                    <div>
                        <p>Тут какое-то видео</p>
                        <button>Теоретический материал</button>
                        <button>Задание</button>
                        <button>Тест</button>
                    </div>
                </div>
            </main>
        </div>
    );
};
export default AssignmentsPage