import * as babosh from 'utils/babosh';
import * as storeHelpers from 'utils/store/helpers';


import TodoItem from './TodoItem';

class TodoItems extends storeHelpers.Observer {
  constructor({
    todoItems = [],
    onDelete,
    onComplete
  }) {
    super();

    this.todoItems = todoItems;
    this.onDelete = onDelete;
    this.onComplete = onComplete;

    babosh.render(this.render(todoItems), document.getElementById('todo-list'));
  }

  renderTodoItem(todoItem) {
    return TodoItem({ todoItem, onDelete: this.onDelete, onComplete: this.onComplete });
  }

  renderTodoItems({ collection, filterKey }) {
    const filterByKey = (collectionItem) => {
      if (filterKey === 'completed') return collectionItem.isCompleted;
      if (filterKey === 'deleted') return collectionItem.isDeleted;
      if (filterKey === 'all') return true;

      return !collectionItem.isDeleted;
    };

    return collection
      .filter(filterByKey)
      .map(this.renderTodoItem.bind(this));
  }

  render(todos = this.todoItems) {
    // console.log('this.todoItems', this.todoItems, this.renderTodoItems(this.todoItems));

    return babosh.createElement('ul', {}, ...this.renderTodoItems(todos));
  }

  update(todos) {
    document.getElementById('todo-list').innerHTML = '';
    babosh.render(this.render(todos), document.getElementById('todo-list'));
  }
}

export default TodoItems;