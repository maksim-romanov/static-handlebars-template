import * as babosh from 'utils/babosh';

import * as storeHelpers from '../utils/store/helpers';

const activeTodoCount = (todos) => todos
  .filter(({ isDeleted }) => !isDeleted)
  .filter(({ isCompleted }) => !isCompleted)
  .length;

class TodoCounter extends storeHelpers.Observer {
  constructor({ todoItems }) {
    super();

    this.todoItems = todoItems;

    babosh.render(this.render(todoItems), document.getElementById('todo-counter'));
  }

  render(todoItems = this.todoItems) {
    return (
      babosh.createElement(
        'span',
        {},
        babosh.createElement('b', {}, activeTodoCount(todoItems)),
        babosh.createElement('span', {}, ' is left')
      )
    );
  }

  update(todos) {
    document.getElementById('todo-counter').innerHTML = '';
    babosh.render(this.render(todos.collection), document.getElementById('todo-counter'));
  }
}

export default TodoCounter;