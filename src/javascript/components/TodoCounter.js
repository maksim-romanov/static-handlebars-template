import * as babosh from 'utils/babosh';

function TodoCounter({ todos }) {
  const activeTodoCount = (todos) => todos
    .filter(({ isDeleted }) => !isDeleted)
    .filter(({ isCompleted }) => !isCompleted)
    .length;

  return (
    babosh.createElement(
      'span',
      {},
      babosh.createElement('b', {}, activeTodoCount(todos.collection)),
      babosh.createElement('span', {}, ' is left')
    )
  );
}

export default TodoCounter;