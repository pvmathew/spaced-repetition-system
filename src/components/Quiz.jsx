import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid } from 'semantic-ui-react';
import Settings from './Settings';
import QuestionCard from './QuestionCard';

const Quiz = () => {
  const questions = useSelector((state) => state.questionsReducer.questions);
  const currentQuestionKey = useSelector(
    (state) => state.queueReducer.currentKey
  );
  const currentQuestion = questions[currentQuestionKey];

  return (
    <Grid style={{ height: '100vh' }} verticalAlign='middle' centered>
      <Grid.Column style={{ maxWidth: '600px' }}>
        {currentQuestionKey === null ? (
          <Settings />
        ) : (
          <QuestionCard
            // key={currentQuestionKey}
            question={currentQuestion.question}
            incorrectAnswers={currentQuestion.incorrect_answers}
            correctAnswer={currentQuestion.correct_answer}
            questionTime={30}
          />
        )}
      </Grid.Column>
    </Grid>
  );
};

export default Quiz;
