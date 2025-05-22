'use client';
import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import type { AppState, AppDispatch } from "@/app/store/store";
import { increment, decrement, incrementByAmount, reset } from "./CounterSlice";

export default function Counter() {
    const count = useSelector((state: AppState) => state.counter.value);
    const dispatch: AppDispatch = useDispatch();

    return(    
    <>
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Contador</h2> 
      <div className="flex items-center space-x-4"> 
        <button
          onClick={() => dispatch(decrement())}
          className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-bold rounded-lg transition duration-300"
        >
          -
        </button>
        <span className="text-3xl font-bold">{count}</span> 
        <button
          onClick={() => dispatch(increment())}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-bold rounded-lg transition duration-300"
        >
          +
        </button>
        <button
          onClick={() => dispatch(incrementByAmount(5))}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300"
        >
          +5
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-lg transition duration-300"
        >
          Resetar
        </button>
      </div>
    </div>
    </>
    );
}
