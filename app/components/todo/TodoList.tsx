'use client';
import React from 'react';
import { useAppSelector } from '../../hooks/hooks';
import { selectAll } from './todoSlice';
import TodoItem from './TodoItem'; 
import AddTodoForm from './AddTodoForm'; 

export default function TodoList() {  
  const todos = useAppSelector(selectAll);

  return (
    <div className="mx-auto my-8 w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl dark:bg-slate-800 md:p-8">
      <h1 className="mb-8 bg-gradient-to-r from-sky-500 to-indigo-600 bg-clip-text pb-2 text-center text-4xl font-extrabold text-transparent dark:from-sky-400 dark:to-indigo-500">
        Lista de Tarefas 📝
      </h1>
      <AddTodoForm />
      {todos && todos.length === 0 ? (
        <p className="mt-8 rounded-md bg-slate-50 p-6 text-center text-slate-500 shadow-inner dark:bg-slate-700 dark:text-slate-400">
          Nenhuma tarefa ainda. Adicione uma! 🎉
        </p>
      ) : (
        <ul className="mt-8 space-y-4">
          {todos && todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      )}
    </div>
  );
}