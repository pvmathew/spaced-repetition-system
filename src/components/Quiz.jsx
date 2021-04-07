import React from 'react';
import he from 'he'; // decodes special characters in html string
import { useSelector } from 'react-redux';
import { Grid, Progress } from 'semantic-ui-react';
import Settings from './Settings';
import QuestionCard from './QuestionCard';
import Results from './Results';

const Quiz = () => {
  const questions = useSelector((state) => state.questionsReducer.questions);
  const { elapsedTime, quizTime, questionTime } = useSelector(
    (state) => state.timerReducer
  );
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
          {quizTime > 0 && elapsedTime === quizTime ? (
            <Results />
          ) : currentQuestionKey === null ? (
            <Settings />
          ) : (
            <QuestionCard
              // key={currentQuestionKey}
              question={he.decode(currentQuestion.question)}
              incorrectAnswers={currentQuestion.incorrect_answers.map((ans) =>
                he.decode(ans)
              )}
              correctAnswer={he.decode(currentQuestion.correct_answer)}
              questionTime={questionTime}
            />
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Quiz;
