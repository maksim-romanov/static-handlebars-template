import * as babosh from 'utils/babosh';

import TodoItem from './TodoItem';

function TodoItems({ todos, onDelete, onComplete }) {
  const renderTodoItem = (todoItem) => TodoItem({ todoItem, onDelete, onComplete });

  const renderTodoItems = ({ collection, filterKey }) => {
    const filterByKey = (collectionItem) => {
      if (filterKey === 'completed') return collectionItem.isCompleted;
      if (filterKey === 'active') return !collectionItem.isDeleted && !collectionItem.isCompleted;
      if (filterKey === 'all') return true;

      return !collectionItem.isDeleted;
    };

    return collection
      .filter(filterByKey)
      .map(renderTodoItem);
  };

  return babosh.createElement('ul', {}, ...renderTodoItems(todos));
}

export default TodoItems;