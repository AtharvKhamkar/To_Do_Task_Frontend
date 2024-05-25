import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the base URL for your API
const BASE_URL = 'https://todo-task-backend-iuj7.onrender.com/api/v1/todo/tasks';

// Async thunks for CRUD operations
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
  const response = await axios.get(BASE_URL);
  console.log(response.data)
  return response.data;
});


export const createTodo = createAsyncThunk('todos/createTodo', async (newTodo) => {
  const response = await axios.post(BASE_URL, newTodo);
  return response.data;
});

export const updateTodo = createAsyncThunk('todos/updateTodo', async (updatedTodo) => {
  const { id, ...data } = updatedTodo;
  const response = await axios.put(`${BASE_URL}/${id}`, data);
  return response.data;
});

export const deleteTodo = createAsyncThunk('todos/deleteTodo', async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
  return id;
});

export const markTaskAsDone = createAsyncThunk(
  'todo/markTaskAsDone',
  async (todo, { rejectWithValue }) => {
    try {
      const updatedStatus = todo.status === 'Done' ? 'Pending' : 'Done';
      const response = await axios.put(`${BASE_URL}/done/${todo._id}`, { ...todo, status: updatedStatus });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);




const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [], // Ensure initial state is an array
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.response.push(action.payload);
      })
      .addCase(updateTodo.fulfilled, (state, action) => {
        const index = state.items.response.findIndex(todo => todo._id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deleteTodo.fulfilled, (state, action) => {
        state.items = state.items.response.filter(todo => todo._id !== action.payload);
      })
      .addCase(markTaskAsDone.fulfilled, (state, action) => {
        // Find and update the task in the state
        const index = state.items.response.findIndex(task => task._id === action.payload.id);
        state.items[index] = action.payload;
      })
    
    
  }
});

export default todosSlice.reducer;
