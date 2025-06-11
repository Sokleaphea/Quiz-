function Questions({ questionData, onAnswerSelected, selectedAnswer}) {
    return (
        <>
        <div>
        <h2>{questionData.question}</h2>
        {questionData.options.map((opt, index) => {
            let className = "option";
            if (selectedAnswer) {
                if (opt === questionData.answer) {
                    className += ' correct';
                } else if (opt === selectedAnswer) {
                    className += ' wrong';
                }
            }
            return (
                <button 
                    key={index}     
                    className={className} 
                    disabled = {!!selectedAnswer}
                    onClick={() => !selectedAnswer && onAnswerSelected(opt)}>{opt}</button>
            );
        })}
        </div>
        </>
    )
}
export default Questions;