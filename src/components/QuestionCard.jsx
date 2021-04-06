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
import he from 'he';
import { useTimer } from '../hooks/useTimer';

const QuestionCard = ({ question, incorrectAnswers, correctAnswer }) => {
  const [answerSelected, setAnswerSelected] = useState('');
  const [answers, setAnswers] = useState([]);
  const timeLeft = useTimer(30, answerSelected);

  useEffect(() => {
    setAnswers(
      [...incorrectAnswers, correctAnswer].sort(() => Math.random() - 0.5)
    );
  }, []);

  useEffect(() => {
    if (answerSelected === correctAnswer) {
      //correct answer was selected!
    } else {
      //oh no..
    }
  }, [answerSelected]);

  useEffect(() => {
    if (timeLeft === 0) setAnswerSelected('none');
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
