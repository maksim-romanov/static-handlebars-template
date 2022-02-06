import './styles/index.sass';


import TodoCounter from 'components/TodoCounter';
import TodoFilters from 'components/TodoFilters';
import TodoForm from 'components/TodoForm';
import TodoItems from 'components/TodoItems';
import * as babosh from 'utils/babosh';
import todosStore from 'utils/store/todosStore';

const todoListNode = document.getElementById('todo-list');
const todoCounterNode = document.getElementById('todo-counter');
const todoFilterNode = document.getElementById('todo-filters');

const startApp = () => {
  const renderTodoForm = () => babosh.render(
    TodoForm({ onSubmit: todosStore.addTodo }),
    document.getElementById('todo-form')
  );

  const renderTodoItems = (todos) => {
    todoListNode.innerHTML = '';

    babosh.render(
      TodoItems({
        todos,
        onDelete: todosStore.deleteTodo,
        onComplete: todosStore.completeTodoToogle
      }),
      todoListNode
    );
  };

  const renderCounter = (todos) => {
    todoCounterNode.innerHTML = '';

    babosh.render(TodoCounter({ todos }), todoCounterNode);
  };

  const renderTodoFilters = (todos) => {
    todoFilterNode.innerHTML = '';

    babosh.render(
      TodoFilters({ todos, onChange: todosStore.changeFilterkey }),
      todoFilterNode
    );
  };

  renderTodoForm();
  todosStore.state.addObserver(renderTodoItems);
  todosStore.state.addObserver(renderCounter);
  todosStore.state.addObserver(renderTodoFilters);

  todosStore.state.update((v) => v);
};

startApp();