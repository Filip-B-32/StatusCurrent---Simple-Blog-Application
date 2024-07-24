// store.js
import { configureStore } from '@reduxjs/toolkit';
import blogPostsReducer from './slices/blogPostSlice';

export const store = configureStore({
  reducer: {
    blogPosts: blogPostsReducer,
  },
});