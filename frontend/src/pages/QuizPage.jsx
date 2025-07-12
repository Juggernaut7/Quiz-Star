import { useEffect, useState } from 'react';
import { fetchQuiz } from '../services/quizService';
import QuestionCard from '../components/QuestionCard';
import { useNavigate } from 'react-router-dom';

const QuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuiz(5, 18); // Example: 5 questions, category 18
        setQuestions(data);
      } catch (err) {
        console.error('Failed to fetch quiz', err);
      }
    };

    loadQuiz();
  }, []);

  const handleAnswer = (option) => {
    setSelected(option);
    if (option === questions[current].correct_answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (current + 1 < questions.length) {
        setCurrent((prev) => prev + 1);
        setSelected(null);
      } else {
        navigate('/result', { state: { score, total: questions.length } });
      }
    }, 800);
  };

  if (questions.length === 0) return <p>Loading quiz...</p>;

  return (
    <div className="quiz-container">
      <QuestionCard
        data={questions[current]}
        index={current + 1}
        total={questions.length}
        selected={selected}
        onAnswer={handleAnswer}
      />
    </div>
  );
};

export default QuizPage;
