import './styles/index.sass';

import { components, utils } from './javascript';
import Logger from "./javascript/utils/Logger"

const appNode = document.getElementById('app')

// const todoFormNode = document.getElementById('todo-form');
// const todosListNode = document.getElementById('todo-list');

const App = () => {
  const INITIAL_STATE = { todos: [] };

  const AppState = new utils.State(INITIAL_STATE);
  AppState.addObserver(new Logger("AppState"));

  const todoForm = new components.TodoForm({ state: AppState, parentNode: appNode });
  const listItems = new components.TodosList({ state: AppState, parentNode: appNode });

  AppState.addObserver(todoForm);
  AppState.addObserver(listItems);
};

App();