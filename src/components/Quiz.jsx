import React from 'react';
import he from 'he'; // used for decoding special characters in html string
import { useSelector } from 'react-redux';
import { Grid, Progress, Segment } from 'semantic-ui-react';
import Settings from './Settings';
import QuestionCard from './QuestionCard';
import Results from './Results';

const Quiz = () => {
  const questions = useSelector((state) => state.questionsReducer.questions);
  const { elapsedTime, quizTime, questionTime } = useSelector(
    (state) => state.timerReducer
  );
  const { answered, key } = useSelector(
    (state) => state.queueReducer.currentQuestion
  );
  const currentQuestion = questions[key];

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
          ) : key === null ? (
            <Settings />
          ) : (
            <Segment>
              <QuestionCard
                questionNum={key}
                answered={answered}
                question={he.decode(currentQuestion.question)}
                incorrectAnswers={currentQuestion.incorrect_answers.map((ans) =>
                  he.decode(ans)
                )}
                correctAnswer={he.decode(currentQuestion.correct_answer)}
                questionTime={questionTime}
              />
            </Segment>
          )}
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Quiz;
