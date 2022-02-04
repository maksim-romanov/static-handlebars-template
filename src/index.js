import './styles/index.sass';

import * as store from 'utils/store';

const appNode = document.getElementById('app');

// const todoFormNode = document.getElementById('todo-form');
// const todosListNode = document.getElementById('todo-list');

const App = () => {
  const AppState = new store.State({ todos: [] });
  AppState.addObserver(new store.Logger('AppState'));

  AppState.update({ todos: [{ id: '1', title: 'test' }] });

  // const todoForm = new components.TodoForm({ state: AppState, parentNode: appNode });
  // const listItems = new components.TodosList({ state: AppState, parentNode: appNode });

  // AppState.addObserver(todoForm);
  // AppState.addObserver(listItems);
};

App();