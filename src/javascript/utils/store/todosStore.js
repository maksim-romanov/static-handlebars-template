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

class TodosStore extends storeHelpers.State{
  constructor() {
    const todosStoreLocalData = utils.localStore.getValue(STORE_NAME);
    super(todosStoreLocalData || INITIAL_STORE);

    this.addObserver(createLogger(STORE_NAME));
    this.addObserver((data) => utils.localStore.saveValue(STORE_NAME, data));

    this.addTodo = this.addTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.allComplete = this.allComplete.bind(this);
    this.changeFilterkey = this.changeFilterkey.bind(this);
    this.completeTodoToogle = this.completeTodoToogle.bind(this);
    this.deleteAllCompleted = this.deleteAllCompleted.bind(this);
  }

  addTodo(todo) {
    this.update(({ collection, ...rest }) => ({
      ...rest,
      collection: [...collection, todo]
    }));
  }

  deleteTodo(todoId) {
    this.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isDeleted: true });
        return todo;
      })
    }));
  }

  allComplete() {
    this.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => ({ ...todo, isCompleted: true }))
    }));
  }

  completeTodoToogle(todoId) {
    this.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isCompleted: !todo.isCompleted });
        return todo;
      })
    }));
  }

  deleteAllCompleted() {
    this.update(({ collection, ...rest }) => ({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.isCompleted) return ({ ...todo, isDeleted: true });
        return todo;
      })
    }));
  }

  changeFilterkey(filterKey) {
    this.update((todos) => ({ ...todos, filterKey }));
  }
}

export default new TodosStore();