import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const { data } = await axios.get('/posts');
  return data;
});

export const fetchTags = createAsyncThunk('posts/fetchTags', async () => {
  const { data } = await axios.get('/posts/tags');
  return data;
});

export const fetchRemovePost = createAsyncThunk('posts/fetchRemovePost', async (id) => {
  await axios.delete(`/posts/${id}`);
  return id;
});

export const fetchCommentsByPostId = createAsyncThunk('comments/fetchCommentsByPostId', async (postId) => {
  const { data } = await axios.get(`/posts/${postId}/comments`);
  return data;
});

export const createComment = createAsyncThunk('comments/createComment', async ({ postId, commentText }) => {
const { data } = await axios.post(`/posts/${postId}/comments`, { text: commentText });
  return data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
  await axios.delete(`/comments/${commentId}`);
  return commentId;
});

const initialState = {
  posts: {
    items: [],
    status: 'loading',
  },
  tags: {
    items: [],
    status: 'loading',
  },
  comments: {
    items: [],
    status: 'idle',
  },
};

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = 'loaded';
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.items = [];
      state.posts.status = 'error';
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    [fetchRemovePost.pending]: (state) => {
      state.posts.status = 'loading';
    },
    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter((obj) => obj._id !== action.payload);
      state.posts.status = 'loaded';
    },
    [fetchCommentsByPostId.pending]: (state) => {
      state.comments.status = 'loading';
    },
    [fetchCommentsByPostId.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'succeeded';
    },
    [fetchCommentsByPostId.rejected]: (state) => {
      state.comments.items = [];
      state.comments.status = 'failed';
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments.items.push(action.payload);
    },
    [deleteComment.fulfilled]: (state, action) => {
      state.comments.items = state.comments.items.filter((comment) => comment._id !== action.payload);
    },
  },
});

export const postReducer = postSlice.reducer;
