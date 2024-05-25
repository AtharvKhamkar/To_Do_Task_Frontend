import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createTodo, fetchTodos } from './todosSlice';

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due: '',
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    await dispatch(createTodo({ ...formData, status: 'Pending' })).unwrap();
    dispatch(fetchTodos());
    setFormData({
      title: '',
      description: '',
      due: '',
    });

  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col space-y-4 mb-4">
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="p-2 border rounded"
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="p-2 border rounded"
        placeholder="Description"
        required
      />
      <input
        type="datetime-local"
        name="due"
        value={formData.due}
        onChange={handleChange}
        className="p-2 border rounded"
        required
      />
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Add Task
      </button>
    </form>
  );
};

export default TodoForm;
