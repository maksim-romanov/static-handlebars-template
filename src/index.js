import './styles/index.sass';


import * as components from 'components';
import * as babosh from 'utils/babosh';
import * as utils from 'utils/common';
import TodosStore from 'utils/store/todosStore';

const todoListNode = document.getElementById('todo-list');
const todoCounterNode = document.getElementById('todo-counter');
const todoFilterNode = document.getElementById('todo-filters');
const todoActionsNode = document.getElementById('todo-actions');

const startApp = () => {
  const { filterKey } = utils.getURLQueryParams();

  const renderTodoForm = () => babosh.render(
    components.TodoForm({
      onSubmit: TodosStore.addTodo,
      onAllComplete: TodosStore.allComplete
    }),
    document.getElementById('todo-form')
  );

  const renderTodoItems = (todos) => {
    todoListNode.innerHTML = '';

    babosh.render(
      components.TodoItems({
        todos,
        onDelete: TodosStore.deleteTodo,
        onComplete: TodosStore.completeTodoToogle
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
          TodosStore.changeFilterkey(filterKey);
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
        onDeleteCompleted: TodosStore.deleteAllCompleted
      }),
      todoActionsNode
    );
  };

  renderTodoForm();
  TodosStore.addObserver(renderTodoItems);
  TodosStore.addObserver(renderCounter);
  TodosStore.addObserver(renderTodoFilters);
  TodosStore.addObserver(renderTodoActions);

  TodosStore.update((state) => ({ ...state, filterKey }));
};

startApp();