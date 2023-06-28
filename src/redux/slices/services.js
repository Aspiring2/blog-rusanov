import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
  const { data } = await axios.get('/services');
  return data;
});

export const fetchServiceTags = createAsyncThunk('services/fetchServiceTags', async () => {
  const { data } = await axios.get('/services/tags');
  return data;
});

export const fetchRemoveService = createAsyncThunk('services/fetchRemoveService', async (id) => {
  await axios.delete(`/services/${id}`);
  return id;
});

export const fetchCommentsByServiceId = createAsyncThunk('comments/fetchCommentsByServiceId', async (serviceId) => {
  const { data } = await axios.get(`/services/${serviceId}/comments`);
  return data;
});

export const createComment = createAsyncThunk('comments/createComment', async ({ serviceId, commentText }) => {
const { data } = await axios.post(`/services/${serviceId}/comments`, { text: commentText });
  return data;
});

export const deleteComment = createAsyncThunk('comments/deleteComment', async (commentId) => {
  await axios.delete(`/comments/${commentId}`);
  return commentId;
});

const initialState = {
  services: {
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

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchServices.pending]: (state) => {
      state.services.status = 'loading';
    },
    [fetchServices.fulfilled]: (state, action) => {
      state.services.items = action.payload;
      state.services.status = 'loaded';
    },
    [fetchServices.rejected]: (state) => {
      state.services.items = [];
      state.services.status = 'error';
    },
    [fetchServiceTags.pending]: (state) => {
      state.tags.status = 'loading';
    },
    [fetchServiceTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = 'loaded';
    },
    [fetchServiceTags.rejected]: (state) => {
      state.tags.items = [];
      state.tags.status = 'error';
    },
    [fetchRemoveService.pending]: (state) => {
      state.services.status = 'loading';
    },
    [fetchRemoveService.fulfilled]: (state, action) => {
      state.services.items = state.services.items.filter((obj) => obj._id !== action.payload);
      state.services.status = 'loaded';
    },
    [fetchCommentsByServiceId.pending]: (state) => {
      state.comments.status = 'loading';
    },
    [fetchCommentsByServiceId.fulfilled]: (state, action) => {
      state.comments.items = action.payload;
      state.comments.status = 'succeeded';
    },
    [fetchCommentsByServiceId.rejected]: (state) => {
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

export const serviceReducer = serviceSlice.reducer;
