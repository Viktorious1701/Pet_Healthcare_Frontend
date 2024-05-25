import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DateState {
  date: string | null;
  slot: string | null;
}

const initialState: DateState = {

  date: localStorage.getItem('date') || null,
  slot: localStorage.getItem('slot') || null,

};

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDateSlot: (state, action: PayloadAction<{ date: string | null; slot: string | null }>) => {
      const { date, slot } = action.payload;
      state.date = date;
      state.slot = slot;

      // Store date and slot in local storage
      if (date) {
        localStorage.setItem('date', date);
      } else {
        localStorage.removeItem('date');
      }

      if (slot) {
        localStorage.setItem('slot', slot);
      } else {
        localStorage.removeItem('slot');
      }

    },
  },
});

export const { setDateSlot } = dateSlice.actions;
export default dateSlice.reducer;