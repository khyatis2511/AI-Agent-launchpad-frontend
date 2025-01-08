import { configureStore } from '@reduxjs/toolkit';
import chatHistoryReducer from './slices/chatHistorySlice';
import chatReducer  from './slices/chatSlice';

const store = configureStore({
  reducer: {
    chatHistory: chatHistoryReducer,
    chat: chatReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
