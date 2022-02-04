import * as babosh from 'utils/babosh';

import * as storeHelpers from '../utils/store/helpers';

const getCompletedCount = (collection) => collection.filter(({ isCompleted }) => isCompleted).length;
const getDeletedCount = (collection) => collection.filter(({ isDeleted }) => isDeleted).length;

class TodoFilters extends storeHelpers.Observer {
  constructor({ onChange, todoItems }) {
    super();

    this.onChange = onChange;
    this.todoItems = todoItems;

    babosh.render(this.render(), document.getElementById('todo-filters'));
  }

  render(todos = this.todoItems) {
    console.log('filterKey', todos.filterKey);

    return (
      babosh.createElement(
        'div',
        {},
        babosh.createElement(
          'button', {
            type: 'button',
            onclick: () => this.onChange('completed'),
            classList: todos.filterKey == 'completed' && ['active']
          },
          `completed ${getCompletedCount(todos.collection)}`
        ),
        babosh.createElement(
          'button', {
            type: 'button',
            onclick: () => this.onChange('deleted'),
            classList: todos.filterKey == 'deleted' && ['active']
          },
          `deleted ${getDeletedCount(todos.collection)}`
        ),
        babosh.createElement(
          'button', {
            type: 'button',
            onclick: () => this.onChange('all'),
            classList: todos.filterKey == 'all' && ['active']
          },
          `all ${todos.collection.length}`
        )
      )
    );
  }

  update(todos) {
    document.getElementById('todo-filters').innerHTML = '';
    babosh.render(this.render(todos), document.getElementById('todo-filters'));
  }
}

export default TodoFilters;