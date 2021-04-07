import React, { useEffect, useState } from 'react';
import {
  Container,
  Segment,
  Form,
  Header,
  Divider,
  Button,
  Message,
} from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { setQuizTime, startQuizSaga } from '../actions';

const Settings = () => {
  const dispatch = useDispatch();
  const [time, setTime] = useState(10);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (time > 0 && time <= 60) {
      setLoading(true);
      dispatch(setQuizTime(parseInt(time, 10) * 60));
      dispatch(startQuizSaga());
    } else {
      setError(true);
    }
  };

  return (
    <Segment textAlign='left' loading={loading}>
      <Header as='h1' textAlign='center'>
        SRS Demo: Video Games
      </Header>
      <Divider />
      <Form>
        <Form.Input
          error={error ? 'Please input a valid number (1-60)' : null}
          label='Desired Quiz Length (Minutes)'
          placeholder='10'
          onChange={(e) => setTime(e.target.value)}
          value={time}
        />

        <Message error content='Please input a valid number (1-60)' />

        <Container textAlign='center'>
          <Button type='submit' color='green' onClick={() => handleSubmit()}>
            Start!
          </Button>
        </Container>
      </Form>
    </Segment>
  );
};

export default Settings;
