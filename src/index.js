import './styles/index.sass';

import { components, utils } from './javascript';
import Logger from "./javascript/utils/Logger"

const todoFormNode = document.getElementById('todo-form');
const todosListNode = document.getElementById('todo-list');

const App = () => {
  const INITIAL_STATE = { todos: [] };

  const AppState = new utils.State(INITIAL_STATE);
  AppState.addObserver(new Logger("AppState"));

  const todoForm = new components.TodoForm({ node: todoFormNode, state: AppState });
  const listItems = new components.TodosList({ node: todosListNode, state: AppState });

  AppState.addObserver(todoForm);
  AppState.addObserver(listItems);
};

App();