import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../axiosConfig/axiosInstance";

//managing fetching async operation
export const fetchBlogPosts = createAsyncThunk(
  "blogPosts/fetchBlogPosts",
  async () => {
    const response = await axiosInstance.get("/blogposts/");
    return response.data;
  }
);

//managing creating async operation
export const createBlogPost = createAsyncThunk(
  "blogPosts/createBlogPost",
  async (newPost) => {
    const response = await axiosInstance.post("/blogposts/", newPost);
    return response.data;
  }
);

//managing updating async operation
export const updateBlogPost = createAsyncThunk(
  "blogPosts/updateBlogPost",
  async ({ id, updatedPost }) => {
    const response = await axiosInstance.put(`/blogposts/${id}/`, updatedPost);
    return response.data;
  }
);

//managing deleting async operation
export const deleteBlogPost = createAsyncThunk(
  "blogPosts/deleteBlogPost",
  async (id) => {
    await axiosInstance.delete(`/blogposts/${id}/`);
    return id;
  }
);

const blogPostsSlice = createSlice({
  name: "blogPosts",
  initialState: {
    posts: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBlogPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
      })
      .addCase(fetchBlogPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createBlogPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
      })
      .addCase(updateBlogPost.fulfilled, (state, action) => {
        const index = state.posts.findIndex(
          (post) => post.BlogPostId === action.payload.BlogPostId
        );
        state.posts[index] = action.payload;
      })
      .addCase(deleteBlogPost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post.BlogPostId !== action.payload
        );
      });
  },
});

export default blogPostsSlice.reducer;
