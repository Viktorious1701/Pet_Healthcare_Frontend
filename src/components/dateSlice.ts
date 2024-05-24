import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  date: string | null;
  slot: string | null;
}

const initialState: DateState = {
  date: null,
  slot: null,
};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDateSlot: (state, action: PayloadAction<{ date: string | null; slot: string | null }>) => {
      state.date = action.payload.date;
      state.slot = action.payload.slot;
    },
  },
});

export const { setDateSlot } = dateSlice.actions;
export default dateSlice.reducer;