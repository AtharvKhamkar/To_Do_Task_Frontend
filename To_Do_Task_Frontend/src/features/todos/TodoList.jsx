import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { deleteTodo, fetchTodos, markTaskAsDone, updateTodo } from './todosSlice';

const TodoList = () => {
  const todos = useSelector((state) => state.todos.items.response);
  const dispatch = useDispatch();
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    due: new Date(),
  });

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteTodo(id)).unwrap();
    dispatch(fetchTodos());
  };

  const handleToggleComplete = async (todo) => {
    await dispatch(markTaskAsDone({ ...todo, status: 'Done' })).unwrap();
    dispatch(fetchTodos());
  };

  const handleEditClick = (todo) => {
    setEditingId(todo._id);
    setEditForm({
      title: todo.title,
      description: todo.description,
      due: new Date(todo.due),
    });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setEditForm({
      ...editForm,
      due: date,
    });
  };

  const handleEditSubmit = async (id) => {
    await dispatch(updateTodo({ ...editForm, id })).unwrap();
    setEditingId(null);
    dispatch(fetchTodos());
  };

  if (!Array.isArray(todos)) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4 max-w-6xl mx-auto">
      {todos.map((todo) => (
        <div key={todo._id} className="bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              {editingId === todo._id ? (
                <input
                  type="text"
                  name="title"
                  value={editForm.title}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Title"
                />
              ) : (
                <h3 className={`text-lg font-semibold ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.title}
                </h3>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {editingId === todo._id ? (
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditChange}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Description"
                />
              ) : (
                <p className={`text-gray-700 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                  {todo.description}
                </p>
              )}
            </div>
            <div className="flex items-center space-x-2">
              {editingId === todo._id ? (
                <DatePicker
                  selected={editForm.due}
                  onChange={handleDateChange}
                  showTimeSelect
                  dateFormat="Pp"
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p className={`text-gray-500 ${todo.completed ? 'line-through' : ''}`}>
                  Due: {new Date(todo.due).toLocaleString()}
                </p>
              )}
            </div>
            <div className="flex space-x-2">
              <button onClick={() => handleToggleComplete(todo)} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                {todo.status}
              </button>
              {editingId === todo._id ? (
                <>
                  <button onClick={() => handleEditSubmit(todo._id)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
                    Cancel
                  </button>
                </>
              ) : (
                <>
                  <button onClick={() => handleEditClick(todo)} className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">
                    Edit
                  </button>
                  <button onClick={() => handleDelete(todo._id)} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                    Delete
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
