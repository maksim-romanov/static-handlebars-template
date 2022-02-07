import * as babosh from 'utils/babosh';

const hasCompleted = (collection) => {
  const activeCount = collection
    .filter(({ isDeleted }) => !isDeleted)
    .filter(({ isCompleted }) => isCompleted)
    .length;

  return activeCount > 0;
};

function TodoActions({ todos, onDeleteCompleted }) {
  if(!hasCompleted(todos.collection)) return;

  return (
    babosh.createElement(
      'div',
      {},
      babosh.createElement(
        'button', { onclick: () => onDeleteCompleted() },
        'clear completed'
      )
    )
  );
}

export default TodoActions;