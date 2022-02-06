import * as utils from 'utils/common';

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

const STORE_NAME = 'todosStore';

const createStore = () => {
  const todosStoreLocalData = utils.localStore.getValue(STORE_NAME);
  const TodosState = new storeHelpers.State(todosStoreLocalData || INITIAL_STORE);

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

  const deleteAllCompleted = () => {
    TodosState.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.isCompleted) return ({ ...todo, isDeleted: true });
        return todo;
      })
    }));
  };

  const changeFilterkey = (filterKey) => TodosState.update((todos) => ({ ...todos, filterKey }));

  TodosState.addObserver(createLogger(STORE_NAME));
  TodosState.addObserver((data) => utils.localStore.saveValue(STORE_NAME, data));

  return ({
    addTodo,
    deleteTodo,
    changeFilterkey,
    completeTodoToogle,
    deleteAllCompleted,
    state: TodosState
  });
};

export default createStore();