import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDispatch } from 'react-redux';
import { createTodo, fetchTodos } from './todosSlice';

const TodoForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due: new Date(),
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      due: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createTodo({
      title: formData.title,
      description: formData.description,
      due: formData.due.toISOString(), // Convert date to ISO string
      status: 'Pending',
    })).unwrap();
    dispatch(fetchTodos());
    setFormData({
      title: '',
      description: '',
      due: new Date(),
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
      <DatePicker
        selected={formData.due}
        onChange={handleDateChange}
        showTimeSelect
        dateFormat="Pp"
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
