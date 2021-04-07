import React, { useEffect, useState } from 'react';
import { Segment, Button, Card, Progress } from 'semantic-ui-react';
import { useDispatch } from 'react-redux';
import { useTimer } from '../hooks/useTimer';
import { answerQuestionSaga } from '../actions';

const QuestionCard = ({
  answered,
  question,
  incorrectAnswers,
  correctAnswer,
  questionTime,
  questionNum,
}) => {
  const dispatch = useDispatch();
  const [answerSelected, setAnswerSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft, pauseTimer, unpauseTimer] = useTimer();
  const [timeTotal, setTimeTotal] = useState(0);

  const initQuestionCard = () => {
    if (!answered) {
      setAnswerSelected(null);
      setTimeLeft(questionTime);
      setTimeTotal(questionTime);
      setAnswers(
        [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5)
      );
      unpauseTimer();
    }
  };

  // on question change
  useEffect(() => initQuestionCard(), [answered]);

  const handleAnswerSelection = () => {
    if (answerSelected) {
      pauseTimer();
      const bool = answerSelected === correctAnswer;
      dispatch(answerQuestionSaga(bool, questionNum));
    }
  };

  // on answer selection
  useEffect(() => handleAnswerSelection(), [answerSelected]);

  // on timeout
  useEffect(() => {
    if (timeLeft === 0 && !answerSelected) {
      dispatch(answerQuestionSaga(false, questionNum));
    }
  }, [timeLeft]);

  const multipleChoice = answers.map((answer, index) => (
    <Button
      key={index}
      basic
      color={
        answerSelected && answer === correctAnswer
          ? 'green'
          : answer === answerSelected && answer !== correctAnswer
          ? 'red'
          : timeLeft === 0 && answer === correctAnswer
          ? 'yellow'
          : null
      }
      onClick={() => {
        if (!answerSelected && timeLeft > 0) setAnswerSelected(answer);
      }}
    >
      {answer}
    </Button>
  ));

  return (
    <Segment textAlign='left' stacked>
      <Progress
        style={{ minWidth: 0 }}
        value={timeLeft}
        total={timeTotal}
        attached='top'
        color='green'
      />
      <Card fluid>
        <Card.Content>
          <Card.Header>{question}</Card.Header>
        </Card.Content>
      </Card>
      <Button.Group vertical fluid>
        {multipleChoice}
      </Button.Group>
    </Segment>
  );
};

export default QuestionCard;
