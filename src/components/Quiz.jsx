import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Settings from './Settings';
import QuestionCard from './QuestionCard';

const Quiz = () => {
  const questions = useSelector((state) => state.questionsReducer.questions);

  return (
    <Grid style={{ height: '100vh' }} verticalAlign='middle' centered>
      <Grid.Column style={{ maxWidth: '600px' }}>
        {questions.length === 0 ? (
          <Settings />
        ) : (
          <QuestionCard
            question={questions[0].question}
            incorrectAnswers={questions[0].incorrect_answers}
            correctAnswer={questions[0].correct_answer}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Quiz;
