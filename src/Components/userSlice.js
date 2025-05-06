import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const addUserAsync = createAsyncThunk(
  'users/addUserAsync',
  async (user, { rejectWithValue }) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(user); 
      }, 1000);
    });
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState: {
    users: [ 
        { id: 1, name: 'Ronjornok Gomburzaga' },
        { id: 2, name: 'Krisostomo Ibakka sa lahat' },
        { id: 3, name: 'Stephen Cawking' },
        { id: 4, name: 'Bisayang Dream' }],
    loading: false,
  },
  reducers: {
    deleteUser: (state, action) => {
      state.users = state.users.filter(user => user.id !== action.payload);
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.users.push(action.payload);
      })
      .addCase(addUserAsync.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { deleteUser } = userSlice.actions;
export default userSlice.reducer;
