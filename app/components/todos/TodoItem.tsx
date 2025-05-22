'use client';
import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/hooks'; //hook personalizado
import { Todo } from '../../types/interfacess';
import { toggleTodo, deleteTodo, editTodo } from './todoSlice';

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToggle = () => {
    dispatch(toggleTodo(todo.id));
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    if (editText.trim()) {
      dispatch(editTodo({ id: todo.id, text: editText.trim() }));
      setIsEditing(false);
    }
  };

  return (
    <li style={{
      display: 'flex',
      alignItems: 'center',
      marginBottom: '10px',
      textDecoration: todo.completed ? 'line-through' : 'none',
      opacity: todo.completed ? 0.6 : 1,
    }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={handleToggle}
        style={{ marginRight: '10px' }}
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave} 
          onKeyDown={(e) => e.key === 'Enter' && handleSave()} 
          autoFocus
          style={{ flexGrow: 1, marginRight: '10px', padding: '5px' }}
        />
      ) : (
        <span onClick={handleToggle} style={{ flexGrow: 1, cursor: 'pointer' }}>
          {todo.text}
        </span>
      )}
      {!isEditing && (
        <button onClick={handleEdit} style={{ marginLeft: '10px', marginRight: '5px', padding: '5px 8px' }}>
          Editar
        </button>
      )}
      {isEditing && (
         <button onClick={handleSave} style={{ marginLeft: '10px', marginRight: '5px', padding: '5px 8px' }}>
          Salvar
        </button>
      )}
      <button onClick={handleDelete} style={{ marginLeft: '5px', padding: '5px 8px', color: 'red' }}>
        Excluir
      </button>
    </li>
  );
};

export default TodoItem;