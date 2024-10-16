import React, { useEffect, useState } from 'react';
import CourseForm from '../CourseForm/page';
import CourseList from '../CourseList/page';
import ChapterForm from '../ChapterForm/page';
import LessonForm from '../LessonForm/page';
import QuizForm from '../QuizForm/page';
import QuestionForm from '../QuestionForm/page';
import ChoiceForm from '../ChoiceForm/page';

const TaskComponent = ({ account }: { account: { id: number; login: string; class: string; role: string } | null }) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [selectedCourse, setSelectedCourse] = useState<any | null>(null);
    const [chapters, setChapters] = useState<any[]>([]);
    const [selectedChapter, setSelectedChapter] = useState<any | null>(null);
    const [lessons, setLessons] = useState<any[]>([]);
    const [selectedLesson, setSelectedLesson] = useState<any | null>(null);
    const [quizzes, setQuizzes] = useState<any[]>([]);
    const [selectedQuiz, setSelectedQuiz] = useState<any | null>(null);
    const [questions, setQuestions] = useState<any[]>([]);
    const [selectedQuestion, setSelectedQuestion] = useState<any | null>(null);

    // Получение курсов
    const fetchCourses = async () => {
        const response = await fetch('/api/task/course');
        const data = await response.json();
        setCourses(data);
    };

    // Получение глав курса
    const fetchChapters = async (courseId: number) => {
        const response = await fetch(`/api/task/chapter?courseId=${courseId}`);
        const data = await response.json();
        setChapters(data);
        setLessons([]); 
        setSelectedLesson(null); 
        setSelectedChapter(null); 
        setSelectedQuiz(null);
        setQuestions([]); 
    };

    // Получение уроков главы
    const fetchLessons = async (chapterId: number) => {
        const response = await fetch(`/api/task/lesson?chapterId=${chapterId}`);
        const data = await response.json();
        setLessons(data);
        setSelectedLesson(null);
        setSelectedQuiz(null);
        setQuestions([]); 
    };

    // Получение викторин урока
    const fetchQuizzes = async (lessonId: number) => {
        const response = await fetch(`/api/task/quiz?lessonId=${lessonId}`);
        const data = await response.json();
        setQuizzes(data);
        setSelectedQuiz(null); 
        setQuestions([]); 
    };

    // Получение вопросов викторины
    const fetchQuestions = async (quizId: number) => {
        const response = await fetch(`/api/task/question?quizId=${quizId}`);
        const data = await response.json();
        setQuestions(data);
        setSelectedQuestion(null); // Сбрасываем выбранный вопрос
    };

    useEffect(() => {
        fetchCourses(); // Загружаем курсы при первом рендере
    }, []);

    // Обновления при добавлении элементов
    const onChapterAdded = () => selectedCourse && fetchChapters(selectedCourse.id);
    const onLessonAdded = () => selectedChapter && fetchLessons(selectedChapter.id);
    const onQuizAdded = () => selectedLesson && fetchQuizzes(selectedLesson.id);
    const onQuestionAdded = () => selectedQuiz && fetchQuestions(selectedQuiz.id);

    return (
        <div style={{ padding: '20px' }}>
            <h1>Система курсов</h1>
            <CourseForm onCourseAdded={fetchCourses} editingCourse={selectedCourse} />
            <CourseList courses={courses} onCourseSelected={(course) => { 
                setSelectedCourse(course); 
                fetchChapters(course.id); 
            }} />

            {selectedCourse && (
                <div>
                    <ChapterForm courseId={selectedCourse.id} onChapterAdded={onChapterAdded} editingChapter={selectedChapter} />
                    <h2>Главы курсов</h2>
                    {chapters.map(chapter => (
                        <div key={chapter.id} onClick={() => { 
                            setSelectedChapter(chapter); 
                            fetchLessons(chapter.id); 
                        }}>
                            {chapter.title}
                        </div>
                    ))}
                </div>
            )}

            {selectedChapter && (
                <div>
                    <LessonForm chapterId={selectedChapter.id} onLessonAdded={onLessonAdded} editingLesson={selectedLesson} />
                    <h2>Уроки главы</h2>
                    {lessons.map(lesson => (
                        <div key={lesson.id} onClick={() => { 
                            setSelectedLesson(lesson); 
                            fetchQuizzes(lesson.id); 
                        }}>
                            {lesson.title}
                        </div>
                    ))}
                </div>
            )}

            {selectedLesson && (
                <div>
                    <QuizForm lessonId={selectedLesson.id} onQuizAdded={onQuizAdded} editingQuiz={selectedQuiz} />
                    <h2>Викторины урока</h2>
                    {quizzes.map(quiz => (
                        <div key={quiz.id} onClick={() => { 
                            setSelectedQuiz(quiz); 
                            fetchQuestions(quiz.id); 
                        }}>
                            {quiz.title}
                        </div>
                    ))}
                </div>
            )}

            {selectedQuiz && (
                <div>
                    <QuestionForm quizId={selectedQuiz.id} onQuestionAdded={onQuestionAdded} editingQuestion={selectedQuestion} />
                    <h2>Вопросы викторины</h2>
                    {questions.map(question => (
                        <div key={question.id} onClick={() => setSelectedQuestion(question)}>
                            {question.text}
                            {question.choices && question.choices.length > 0 && (
                                <div>
                                    {question.choices.map((choice: { id: React.Key; text: string; isCorrect: boolean }) => (
                                        <div key={choice.id}>
                                            {choice.text} {choice.isCorrect && '(Правильный)'}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {selectedQuestion && (
                <div>
                    <ChoiceForm questionId={selectedQuestion.id} onChoiceAdded={() => fetchQuestions(selectedQuiz.id)} />
                </div>
            )}

        </div>
    );
};

export default TaskComponent;
