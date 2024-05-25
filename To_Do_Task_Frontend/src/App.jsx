import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import TodoForm from './features/todos/TodoForm';
import TodoList from './features/todos/TodoList';
import { fetchTodos } from './features/todos/todosSlice';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-purple-300 flex items-center justify-center">
      <div className="bg-pink-300 p-5 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Things to do:</h1>
        <TodoForm />
        <TodoList />
      </div>
    </div>
  );
}

export default App;