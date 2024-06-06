// slices/formSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { number } from 'yup';
import { PetGet } from '@/Models/Pet';
const initialState = {
  formData: {
    customerUserName: "",
    petId: 0,
    vetUserName: "",
    slotId: 0,
    serviceId: 0,
    date: ""
  },
  isSubmitted: false,
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormData: (state, action) => {
      state.formData = action.payload;
      state.isSubmitted = true;
    }
  },
});

export const { setFormData } = formSlice.actions;
export default formSlice.reducer;