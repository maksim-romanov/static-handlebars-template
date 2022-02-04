import { Observer, generateUUID, createChild } from 'utils';

const createTodo = ({ title }) => ({ id: generateUUID(), title, isCompleted: false });

const renderForm = () => (`
  <div>
    <form id="create-todo-form">
      <label for="title">Add a User</label>
      <input id="title" type="text" name="title">
      <button type="submit">Add</button>
    </form>
  </div>
`);

class TodoForm extends Observer {
  constructor({ state, parentNode }) {
    super();
    this.node = createChild(parentNode);
    this.state = state;

    this.render();
    this.bindEvents();
  }

  bindEvents() {
    const createTodoForm = this.node.querySelector('#create-todo-form');

    createTodoForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const title = event.target.title.value;
      if (!title) return;

      const state = this.state.get();
      this.state.update({ ...state, todos: [...state.todos, createTodo({ title })] });

      createTodoForm.reset();
    });
  }

  createMarkup() { return renderForm(); }
  render() { this.node.innerHTML = this.createMarkup(); }
}

export default TodoForm;