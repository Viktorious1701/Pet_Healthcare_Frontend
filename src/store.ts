import { configureStore } from '@reduxjs/toolkit';
import dateReducer from '@/components/slices/dateSlice';
import formSlice from './components/slices/formSlice';

const store = configureStore({
  reducer: {
    date: dateReducer,
    formData: formSlice
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
