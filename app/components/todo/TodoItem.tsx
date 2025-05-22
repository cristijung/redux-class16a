"use client";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { Todo } from "../../types/interfacess"; 
import { toggleTodo, deleteTodo, editTodo } from "./todoSlice";

interface TodoItemProps {
  todo: Todo;
}

export default function TodoItem({ todo }: TodoItemProps) {
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
    } else {     
      setEditText(todo.text); 
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSave();
    } else if (e.key === "Escape") {
      setEditText(todo.text); 
      setIsEditing(false);
    }
  };

  return (
    <li
      className={`
        flex items-center justify-between p-4 mb-3 rounded-lg shadow
        bg-white dark:bg-slate-800
        transition-all duration-300 ease-in-out
        ${todo.completed ? "opacity-60 dark:opacity-50" : "opacity-100"}
        hover:shadow-md
      `}
    >
      <div className="flex items-center flex-grow">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleToggle}
          className="mr-4 h-5 w-5 cursor-pointer rounded border-slate-300 text-sky-500 focus:ring-sky-400 dark:border-slate-600 dark:text-sky-600 dark:focus:ring-sky-500 dark:focus:ring-offset-slate-800"
        />
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave} 
            onKeyDown={handleKeyDown} 
            autoFocus
            className="flex-grow rounded-md border border-slate-300 bg-slate-50 px-3 py-2 text-sm text-slate-700 placeholder-slate-400 transition-colors duration-150 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-sky-600"
          />
        ) : (
          <span
            onClick={handleToggle}
            className={`
              flex-grow cursor-pointer select-none text-slate-700 dark:text-slate-200
              ${
                todo.completed
                  ? "line-through text-slate-500 dark:text-slate-400"
                  : ""
              }
            `}
          >
            {todo.text}
          </span>
        )}
      </div>

      <div className="ml-4 flex flex-shrink-0 items-center space-x-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="rounded-md bg-green-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-150 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            Salvar
          </button>
        ) : (
          <button
            onClick={handleEdit}
            className="rounded-md bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-150 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
          >
            Editar
          </button>
        )}
        <button
          onClick={handleDelete}
          className="rounded-md bg-red-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm transition-colors duration-150 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
        >
          Excluir
        </button>
      </div>
    </li>
  );
}
