import './styles/index.sass';

import * as babosh from 'utils/babosh';

import TodoCounter from './javascript/components/TodoCounter';
import TodoFilters from './javascript/components/TodoFilters';
import TodoForm from './javascript/components/TodoForm';
import TodoItems from './javascript/components/TodoItems';
import todosStore from './javascript/utils/store/todosStore';

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

  const todoCounter = new TodoCounter({ todoItems: todos.collection });
  todosStore.state.addObserver(todoCounter);

  const todoFilters = new TodoFilters({ onChange: todosStore.changeFilterkey, todoItems: todos });
  todosStore.state.addObserver(todoFilters);
};

startApp();