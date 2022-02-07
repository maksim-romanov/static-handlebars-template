import * as babosh from 'utils/babosh';
import { generateUUID } from 'utils/common';

function TodoForm({ onSubmit, onAllComplete }) {
  const createTodo = ({ title }) => ({ id: generateUUID(), title, isCompleted: false });

  const submitHandler = (event) => {
    event.preventDefault();

    const title = event.target.title.value;
    if (!title) return;

    onSubmit(createTodo({ title }));

    event.target.reset();
    event.target.title.focus();
  };

  return (
    babosh.createElement(
      'form',
      { onsubmit: submitHandler },
      babosh.createElement(
        'button',
        {
          type: 'button',
          onclick: onAllComplete
        },
        'all completed'
      ),
      babosh.createElement(
        'div',
        {},
        babosh.createElement('label', { htmlFor: 'title' }, 'Add todo'),
        babosh.createElement('input', { id: 'title', name: 'title', type: 'text' }),
        babosh.createElement('button', { type: 'submit' }, 'Add')
      )
    )
  );
}

export default TodoForm;