import './styles/index.sass';

import * as babosh from 'utils/babosh';

import TodoCounter from './javascript/components/TodoCounter';
import TodoForm from './javascript/components/TodoForm';
import TodoItems from './javascript/components/TodoItems';
import todosStore from './javascript/utils/store/todosStore';

const startApp = () => {
  const { collection } = todosStore.state.get();

  console.log('collection', collection);

  const renderTodoForm = () => TodoForm({ onSubmit: todosStore.addTodo });
  babosh.render(renderTodoForm(), document.getElementById('todo-form'));

  const todoItems = new TodoItems({
    todoItems: collection,
    onDelete: todosStore.deleteTodo,
    onComplete: todosStore.completeTodoToogle
  });
  todosStore.state.addObserver(todoItems);

  const todoCounter = new TodoCounter({ todoItems: collection });
  todosStore.state.addObserver(todoCounter);
};

startApp();