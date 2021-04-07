import React, { useEffect, useState } from 'react';
import he from 'he';
import { Segment, Button, Card, Progress } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useTimer } from '../hooks/useTimer';
import { answerQuestionSaga } from '../actions';

const QuestionCard = ({
  question,
  incorrectAnswers,
  correctAnswer,
  questionTime,
}) => {
  const dispatch = useDispatch();
  const [answerSelected, setAnswerSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft, pauseTimer, unpauseTimer] = useTimer();
  const [timeTotal, setTimeTotal] = useState(0);

  const initQuestionCard = () => {
    setAnswerSelected(null);
    setTimeLeft(questionTime);
    setTimeTotal(questionTime);
    setAnswers(
      [...incorrectAnswers, correctAnswer]
        .sort(() => Math.random() - 0.5)
        .map((ans) => he.decode(ans))
    );
    unpauseTimer();
  };

  // on question change
  useEffect(() => initQuestionCard(), [question]);

  const handleAnswerSelection = () => {
    if (answerSelected) {
      pauseTimer();
      const bool = answerSelected === correctAnswer;
      dispatch(answerQuestionSaga(bool));
    }
  };

  // on answer selection
  useEffect(() => handleAnswerSelection(), [answerSelected]);

  // on timeout
  useEffect(() => {
    if (timeLeft === 0 && !answerSelected) {
      dispatch(answerQuestionSaga(false));
    }
  }, [timeLeft]);

  const multipleChoice = answers.map((answer) => (
    <Button
      basic
      color={
        answerSelected && answerSelected !== 'none' && answer === correctAnswer
          ? 'green'
          : answer === answerSelected && answerSelected !== correctAnswer
          ? 'red'
          : timeLeft === 0 && answer === correctAnswer
          ? 'yellow'
          : null
      }
      onClick={() => {
        if (!answerSelected) setAnswerSelected(answer);
      }}
    >
      {answer}
    </Button>
  ));

  return (
    <Segment textAlign='left' stacked>
      {timeLeft}
      <Progress
        style={{ minWidth: 0 }}
        value={timeLeft}
        total={timeTotal}
        attached='top'
        color='green'
      />
      <Card fluid>
        {correctAnswer}
        <Card.Content>
          <Card.Header>{he.decode(question)}</Card.Header>
        </Card.Content>
      </Card>
      <Button.Group vertical fluid>
        {multipleChoice}
      </Button.Group>
    </Segment>
  );
};

export default QuestionCard;
