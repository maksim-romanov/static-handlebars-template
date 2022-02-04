import * as storeHelpers from './helpers';

// class TodosStore extends storeHelpers.State {
//   // constructor() {}

// }

const INITIAL_STORE = {
  filterKey: null,
  collection: [{
    id: 'initial',
    title: 'initial',
    isCompleted: false,
    isDeleted: false
  }]
};

const createStore = () => {
  const TodosState = new storeHelpers.State({ ...INITIAL_STORE });
  TodosState.addObserver(new storeHelpers.Logger('TodosState'));

  const addTodo = (todo) => {
    const { collection, ...rest } = TodosState.get();

    TodosState.update({ ...rest, collection: [...collection, todo] });
  };

  const deleteTodo = (todoId) => {
    const { collection, ...rest } = TodosState.get();

    TodosState.update({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isDeleted: true });
        return todo;
      })
    });
  };

  const completeTodoToogle = (todoId) => {
    const { collection, ...rest } = TodosState.get();

    TodosState.update({
      ...rest,
      collection: collection.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isCompleted: !todo.isCompleted });
        return todo;
      })
    });
  };

  const changeFilterkey = (filterKey) => {
    const todos = TodosState.get();

    TodosState.update({ ...todos, filterKey });
  };

  return ({
    addTodo,
    deleteTodo,
    completeTodoToogle,
    changeFilterkey,
    state: TodosState
  });
};

export default createStore();