import React, { useEffect, useState } from 'react';
import {
  Container,
  Segment,
  Form,
  Header,
  Divider,
  Button,
  Message,
  Card,
  Progress,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import he from 'he';
import { useTimer } from '../hooks/useTimer';
import { answerQuestionSaga } from '../actions';

const QuestionCard = ({
  question,
  incorrectAnswers,
  correctAnswer,
  questionTime,
}) => {
  const dispatch = useDispatch();
  const [answerSelected, setAnswerSelected] = useState('');
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useTimer();

  // on question change
  useEffect(() => {
    setAnswerSelected('');
    setTimeLeft(questionTime);
    setAnswers(
      [...incorrectAnswers, correctAnswer]
        .sort(() => Math.random() - 0.5)
        .map((ans) => he.decode(ans))
    );
  }, [question]);

  // on answer selection
  useEffect(() => {
    if (answerSelected === correctAnswer) {
      setTimeout(() => {
        setAnswerSelected('');
        dispatch(answerQuestionSaga(true));
      }, 3000);
    } else if (answerSelected && answerSelected !== correctAnswer) {
      setTimeout(() => {
        dispatch(answerQuestionSaga(false));
      }, 3000);
    }
  }, [answerSelected]);

  // on timeout

  useEffect(() => {
    if (timeLeft === 0) {
      setTimeout(() => {
        dispatch(answerQuestionSaga(false));
      }, 3000);
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
      <Progress
        style={{ minWidth: 0 }}
        value={timeLeft}
        total={30}
        attached='top'
      />
      {/* {timeLeft} */}
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
