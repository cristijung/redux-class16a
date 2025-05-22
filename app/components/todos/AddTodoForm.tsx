'use client';
import React, { useState } from "react";
import { useAppDispatch } from "@/app/hooks/hooks";
import { addTodo } from "./todoSlice";

const AddTodoForm: React.FC = () => {
  const [text, setText] = useState('');
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que precisa ser feito?"
        style={{ marginRight: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ padding: '8px 12px' }}>
        Adicionar Tarefa
      </button>
    </form>
  );
};

export default AddTodoForm;
