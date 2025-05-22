"use client";
import React, { useState } from "react";
import { useAppDispatch } from "../../hooks/hooks";
import { addTodo } from "./todoSlice";

export default function AddTodoForm() {
  const [text, setText] = useState("");
  const dispatch = useAppDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(addTodo(text.trim()));
      setText("");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-8 flex w-full max-w-lg rounded-lg bg-white p-4 shadow-lg transition-shadow duration-300 hover:shadow-xl dark:bg-slate-800"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="O que precisa ser feito?"
        className="mr-4 flex-grow rounded-md border border-slate-300 bg-slate-50 px-4 py-3 text-slate-700 placeholder-slate-400 transition-all duration-300 focus:border-sky-500 focus:ring-2 focus:ring-sky-200 focus:outline-none dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:placeholder-slate-500 dark:focus:border-sky-600 dark:focus:ring-sky-700"
      />
      <button
        type="submit"
        className="rounded-md bg-sky-500 px-6 py-3 font-semibold text-white transition-all duration-300 ease-in-out hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2 active:bg-sky-700 dark:bg-sky-600 dark:hover:bg-sky-700 dark:focus:ring-sky-800 dark:focus:ring-offset-slate-800"
      >
        Adicionar Tarefa ✨
      </button>
    </form>
  );
}
