import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DateState {
  date: string | null
  slot: string | null
  user: string | null
}

const initialState: DateState = {
  date: localStorage.getItem('date') || null,
  slot: localStorage.getItem('slot') || null,
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null
}

const dateSlice = createSlice({
  name: 'date',
  initialState,
  reducers: {
    setDateSlot: (state, action: PayloadAction<{ date: string | null; slot: string | null }>) => {
      const { date, slot } = action.payload
      state.date = date
      state.slot = slot

      // Store date and slot in local storage
      if (date) {
        localStorage.setItem('date', date)
      } else {
        localStorage.removeItem('date')
      }

      if (slot) {
        localStorage.setItem('slot', slot)
      } else {
        localStorage.removeItem('slot')
      }
    },
    setUserBooking: (
      state,
      action: PayloadAction<{ date: string | null; slot: string | null; user: string | null }>
    ) => {
      const { date, slot, user } = action.payload
      state.date = date
      state.slot = slot
      state.user = user

      // Store date, slot, and user in local storage
      if (date) {
        localStorage.setItem('date', date)
      } else {
        localStorage.removeItem('date')
      }

      if (slot) {
        localStorage.setItem('slot', slot)
      } else {
        localStorage.removeItem('slot')
      }

      if (user) {
        localStorage.setItem('user', JSON.stringify(user))
      } else {
        localStorage.removeItem('user')
      }
    }
  }
})

export const { setDateSlot, setUserBooking } = dateSlice.actions
export default dateSlice.reducer
