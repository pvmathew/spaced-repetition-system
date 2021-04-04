/* eslint-disable import/prefer-default-export */

export async function getQuestions() {
  const response = await fetch(
    'https://opentdb.com/api.php?amount=20&category=15&difficulty=medium&type=multiple'
  );
  return response.json();
}
