import * as storeHelpers from './helpers';

const createStore = () => {
  const TodosState = new storeHelpers.State([{ id: 'initial', title: 'initial', isCompleted: false }]);

  const addTodo = (todo) => {
    const todos = TodosState.get();

    TodosState.update([...todos, todo]);
  };

  const deleteTodo = (todoId) => {
    const todos = TodosState.get();

    TodosState.update(
      todos.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isDeleted: true });
        return todo;
      })
    );
  };

  const completeTodoToogle = (todoId) => {
    console.log('!', todoId);
    const todos = TodosState.get();

    TodosState.update(
      todos.map((todo) => {
        if (todo.id == todoId) return ({ ...todo, isCompleted: !todo.isCompleted });
        return todo;
      })
    );
  };

  return ({
    addTodo,
    deleteTodo,
    completeTodoToogle,
    state: TodosState
  });
};

export default createStore();