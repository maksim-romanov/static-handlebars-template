import './styles/index.sass';

import * as babosh from 'utils/babosh';
import * as storeHelpers from 'utils/store/helpers';

import TodoForm from './javascript/components/TodoForm';
import TodoItems from './javascript/components/TodoItems';
import todosStore from './javascript/utils/store/todosStore';

// const appNode = document.getElementById('app');

const startApp = () => {
  const todos = todosStore.state.get();

  const renderTodoForm = () => TodoForm({ onSubmit: todosStore.addTodo });
  babosh.render(renderTodoForm(), document.getElementById('todo-form'));

  const todoItems = new TodoItems({
    todoItems: todos,
    onDelete: todosStore.deleteTodo,
    onComplete: todosStore.completeTodoToogle
  });
  todosStore.state.addObserver(todoItems);

  todosStore.state.addObserver(new storeHelpers.Logger('TodosState'));
};

startApp();