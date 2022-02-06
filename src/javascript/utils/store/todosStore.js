import { createLogger } from '../logger';
import * as storeHelpers from './helpers';

export const INITIAL_STORE = {
  filterKey: null,
  collection: [{
    id: 'initial',
    title: 'initial',
    isCompleted: false,
    isDeleted: false
  }]
};

const createStore = () => {
  const TodosState = new storeHelpers.State(INITIAL_STORE);

  const addTodo = (todo) => {
    TodosState.update(({ collection, ...rest }) => ({
      ...rest,
      collection: [...collection, todo]
    }));
  };

  const deleteTodo = (todoId) => {
    TodosState.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isDeleted: true });
        return todo;
      })
    }));
  };

  const completeTodoToogle = (todoId) => {
    TodosState.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isCompleted: !todo.isCompleted });
        return todo;
      })
    }));
  };

  const changeFilterkey = (filterKey) => TodosState.update((todos) => ({ ...todos, filterKey }));

  TodosState.addObserver(createLogger('TodosState'));

  return ({
    addTodo,
    deleteTodo,
    completeTodoToogle,
    changeFilterkey,
    state: TodosState
  });
};

export default createStore();