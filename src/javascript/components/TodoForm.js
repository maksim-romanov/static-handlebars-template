import * as babosh from 'utils/babosh';
import { generateUUID } from 'utils/common';

const createTodo = ({ title }) => ({ id: generateUUID(), title, isCompleted: false });

class TodoForm {
  constructor({ state }) {
    this.state = state;
  }

  testCallback(event) {
    event.preventDefault();

    const title = event.target.title.value;
    if (!title) return;

    const state = this.state.get();

    this.state.update({ ...state, todos: [...state.todos, createTodo({ title })] });

    event.target.reset();
  }

  render() {
    return (
      babosh.createElement(
        'form',
        { onsubmit: this.testCallback.bind(this) },
        babosh.createElement('label', { htmlFor: 'title' }, 'Add todo'),
        babosh.createElement('input', { id: 'title', name: 'title', type: 'text' }),
        babosh.createElement('button', { type: 'submit' }, 'Add')
      )
    );
  }
}

export default TodoForm;