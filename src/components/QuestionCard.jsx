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
} from 'semantic-ui-react';
import he from 'he';

const QuestionCard = ({ question, incorrectAnswers, correctAnswer }) => {
  const [answerSelected, setAnswerSelected] = useState('');
  const [answers, setAnswers] = useState([]);

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

  const multipleChoice = answers.map((answer) => (
    <Button
      basic
      negative={answerSelected === answer && answerSelected !== correctAnswer}
      positive={answerSelected && answer === correctAnswer}
      onClick={() => {
        if (!answerSelected) setAnswerSelected(answer);
      }}
    >
      {answer}
    </Button>
  ));

  return (
    <Segment textAlign='left' stacked>
      {correctAnswer}
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
