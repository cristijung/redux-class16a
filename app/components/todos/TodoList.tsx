'use client';
import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectAllTodos } from './todoSlice';
import TodoItem from './TodoItem';
import AddTodoForm from './AddTodoForm';

const TodoList: React.FC = () => {
  const todos = useAppSelector(selectAllTodos);
  

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h1 style={{ textAlign: 'center' }}>Lista de Tarefas (Redux)</h1>
      <AddTodoForm />
      {todos.length === 0 ? (
        <p style={{ textAlign: 'center' }}>Nenhuma tarefa ainda. Adicione uma!</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoList;