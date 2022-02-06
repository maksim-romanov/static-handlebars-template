import './styles/index.sass';


import * as components from 'components';
import * as babosh from 'utils/babosh';
import * as utils from 'utils/common';
import todosStore from 'utils/store/todosStore';

const todoListNode = document.getElementById('todo-list');
const todoCounterNode = document.getElementById('todo-counter');
const todoFilterNode = document.getElementById('todo-filters');
const todoActionsNode = document.getElementById('todo-actions');

const startApp = () => {
  const { filterKey } = utils.getURLQueryParams();

  const renderTodoForm = () => babosh.render(
    components.TodoForm({ onSubmit: todosStore.addTodo }),
    document.getElementById('todo-form')
  );

  const renderTodoItems = (todos) => {
    todoListNode.innerHTML = '';

    babosh.render(
      components.TodoItems({
        todos,
        onDelete: todosStore.deleteTodo,
        onComplete: todosStore.completeTodoToogle
      }),
      todoListNode
    );
  };

  const renderCounter = (todos) => {
    todoCounterNode.innerHTML = '';

    babosh.render(
      components.TodoCounter({ todos }),
      todoCounterNode
    );
  };


  const renderTodoFilters = (todos) => {
    todoFilterNode.innerHTML = '';

    babosh.render(
      components.TodoFilters({
        todos,
        onChange: (filterKey) => {
          utils.addURLQueryParam('filterKey', filterKey);
          todosStore.changeFilterkey(filterKey);
        }
      }),
      todoFilterNode
    );
  };

  const renderTodoActions = (todos) => {
    todoActionsNode.innerHTML = '';

    babosh.render(
      components.TodoActions({
        todos,
        onDeleteCompleted: todosStore.deleteAllCompleted
      }),
      todoActionsNode
    );
  };

  renderTodoForm();
  todosStore.state.addObserver(renderTodoItems);
  todosStore.state.addObserver(renderCounter);
  todosStore.state.addObserver(renderTodoFilters);
  todosStore.state.addObserver(renderTodoActions);

  todosStore.state.update((state) => ({ ...state, filterKey }));
};

startApp();