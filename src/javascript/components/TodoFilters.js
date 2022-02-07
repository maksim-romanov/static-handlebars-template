import * as babosh from 'utils/babosh';

const getCompletedCount = (collection) => collection
  .filter(({ isDeleted }) => !isDeleted)
  .filter(({ isCompleted }) => isCompleted)
  .length;

const getActiveCount = (collection) => collection
  .filter(({ isDeleted }) => !isDeleted)
  .filter(({ isCompleted }) => !isCompleted)
  .length;

const getAllCount = (collection) => collection
  .filter(({ isDeleted }) => !isDeleted)
  .length;

function TodoFilters({ todos, onChange }) {
  return (
    babosh.createElement(
      'div',
      {},
      babosh.createElement(
        'a', {
          href: '#',
          onclick: () => onChange('all'),
          classList: todos.filterKey == 'all' && ['active']
        },
        `all ${getAllCount(todos.collection)}`
      ),
      babosh.createElement(
        'a', {
          href: '#',
          onclick: () => onChange('active'),
          classList: todos.filterKey == 'active' && ['active']
        },
        `active ${getActiveCount(todos.collection)}`
      ),
      babosh.createElement(
        'a', {
          href: '#',
          onclick: () => onChange('completed'),
          classList: todos.filterKey == 'completed' && ['active']
        },
        `completed ${getCompletedCount(todos.collection)}`
      )
    )
  );
}

export default TodoFilters;