import * as babosh from 'utils/babosh';

function TodoItem({
  todoItem,
  onDelete,
  onComplete
}) {
  const completeHandler = () => onComplete(todoItem.id);
  const deleteHandler = () => onDelete(todoItem.id);

  return (
    babosh.createElement(
      'li',
      { id: todoItem.id },
      babosh.createElement('input', { type: 'checkbox', onclick: completeHandler, checked: todoItem.isCompleted }, ''),
      babosh.createElement('span', {}, todoItem.title),
      babosh.createElement('button', { type: 'button', onclick: deleteHandler }, 'delete')
    )
  );
}

export default TodoItem;