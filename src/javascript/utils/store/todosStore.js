import * as storeHelpers from './helpers';

// class TodosStore extends storeHelpers.State {
//   // constructor() {}

// }

const createStore = () => {
  const TodosState = new storeHelpers.State({ collection: [{ id: 'initial', title: 'initial', isCompleted: false }] });
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

  return ({
    addTodo,
    deleteTodo,
    completeTodoToogle,
    state: TodosState
  });
};

export default createStore();