import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestionsSaga } from '../actions';

const Settings = () => {
  const dispatch = useDispatch();
  const questions = useSelector((state) => state.questionsReducer.questions);

  useEffect(() => {
    dispatch(getQuestionsSaga());
  }, []);
};

export default Settings;
