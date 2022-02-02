import { Observer } from 'utils';

const getButtonId = (todo) => `${todo.id}-delete-button`;

const renderTodo = (todo) => (`
  <li>
    <input type="checkbox" id="scales" name="scales" ${todo.completed && 'checked'}>
    <span>${todo.title}</span>
    <button id="${getButtonId(todo)}-delete-button">Delete</button>
  </li>
`);

const renderTodos = (state) => {
  if (!state.todos) return ('<span>Empty</span>');

  return (`
    <ul>
      ${state.todos.map(renderTodo).join('')}
    </ul>
  `);
};

class TodosList extends Observer {
  constructor({ state, node }) {
    super();
    this.node = node;
    this.render(state.get());
  }

  // assignDeleteAction(todo) {
  //   const button = this.node.querySelector(`[id="${}"]`);
  //   console.log('button', button);
  //   // console.log('@@@@@', button, getButtonId(todo));
  // }

  createMarkup(state) { return renderTodos(state); }
  render(state) {
    this.node.innerHTML = this.createMarkup(state);
  }

  // Observer update
  update(state) {
    this.render(state);
    // state.todos.forEach((todo) => console.log(document.getElementById(getButtonId(todo))));
  }
}

export default TodosList;