// slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  formData: null,
  isSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
      state.isSubmitted = true;
    },
    resetFormData: (state) => {
      state.formData = null;
      state.isSubmitted = false;
    },
  },
});

export const { setFormData, resetFormData } = formSlice.actions;
export default formSlice.reducer;