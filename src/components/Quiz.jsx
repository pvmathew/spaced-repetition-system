import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Progress } from 'semantic-ui-react';
import Settings from './Settings';
import QuestionCard from './QuestionCard';
import { useTimer } from '../hooks/useTimer';

const Quiz = () => {
  const questions = useSelector((state) => state.questionsReducer.questions);
  const elapsedTime = useSelector((state) => state.timerReducer.timeElapsed);
  const quizTime = useSelector((state) => state.timerReducer.quizTime);
  const currentQuestionKey = useSelector(
    (state) => state.queueReducer.currentKey
  );
  const currentQuestion = questions[currentQuestionKey];

  return (
    <>
      <Progress
        inverted
        value={quizTime - elapsedTime}
        total={quizTime}
        label='Quiz Time Left'
        color='green'
        progress='value'
      />
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
    </>
  );
};

export default Quiz;
