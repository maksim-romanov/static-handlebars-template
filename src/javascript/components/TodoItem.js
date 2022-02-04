import * as babosh from 'utils/babosh';

function TodoItem({
  todoItem,
  onDelete,
  onComplete
}) {
  const renderDeleteButton = () => {
    if (todoItem.isDeleted) return (
      babosh.createElement(
        'span',
        { classList: ['danger'] },
        '\t deleted'
      )
    );

    return (
      babosh.createElement(
        'button',
        {
          type: 'button',
          onclick: () => onDelete(todoItem.id)
        },
        'delete'
      )
    );
  };

  return (
    babosh.createElement(
      'li',
      { id: todoItem.id },
      babosh.createElement(
        'input', {
          type: 'checkbox',
          onclick: () => onComplete(todoItem.id),
          disabled: todoItem.isDeleted,
          checked: todoItem.isCompleted
        }
      ),
      babosh.createElement('span', {}, todoItem.title),
      renderDeleteButton()
    )
  );
}

export default TodoItem;