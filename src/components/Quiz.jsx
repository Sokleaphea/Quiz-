import { useEffect, useState } from "react";
import Questions from "./Question.jsx";
import quizQuestions from "../data/questions.js";


function Quiz() {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(15);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    useEffect(() => {
        if (showResult) return;

        if (timeLeft === 0) {
            nextQuestion();
            return;
        }

        const timerID = setInterval(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearInterval(timerID);
    }, [timeLeft, showResult]);

    const nextQuestion = () => {
        const next = currentIndex + 1;
        if (next < quizQuestions.length) {
            setCurrentIndex(next);
            setTimeLeft(15);
        } else {
            setShowResult(true);
        }
    }

    const handleAnswer = (selected) => {
        setSelectedAnswer(selected);

        if (selected === quizQuestions[currentIndex].answer) {
            setScore (score + 1);
        }
        setTimeout(() => {
            setSelectedAnswer(null);
            nextQuestion();
        }, 1000);
    };

    return showResult ? (
        <h2>Your score: {score} / {quizQuestions.length}</h2>
    ) : (
        <>
        <p>Question {currentIndex + 1} of {quizQuestions.length}</p>
        <div> Time left: {timeLeft}s</div>
        <Questions
            questionData={quizQuestions[currentIndex]}
            onAnswerSelected={handleAnswer}
            selectedAnswer={selectedAnswer}
        />
        </>
    );
}
export default Quiz;