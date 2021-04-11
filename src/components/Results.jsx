/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Header, List } from 'semantic-ui-react';

const Results = () => {
  const { numCorrect, numWrong } = useSelector(
    (state) => state.questionsReducer
  );

  return (
    <Segment textAlign='center'>
      <Header as='h1'>The Quiz is now over!</Header>
      <List divided verticalAlign='middle' textAlign='left'>
        <List.Item>
          <List.Content>
            <List.Header>
              Total Number of Questions: {numCorrect + numWrong}
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              Correct: <span style={{ color: 'green' }}>{numCorrect}</span>
            </List.Header>
          </List.Content>
        </List.Item>
        <List.Item>
          <List.Content>
            <List.Header>
              Wrong: <span style={{ color: 'red' }}>{numWrong}</span>
            </List.Header>
          </List.Content>
        </List.Item>
      </List>
    </Segment>
  );
};

export default Results;
