import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../axios'

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const { data } = await axios.get('/posts')
	return data
})

export const fetchServices = createAsyncThunk('services/fetchServices', async () => {
	const { data } = await axios.get('/services')
	return data
})

const initialState = {
	posts: {
		items: [],
		status: 'loading',
	},
	services: {
		items: [],
		status: 'loading',
	},
	tags: {
		items: [],
		status: 'loading',
	},
}

const postSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchPosts.pending]: (state) => {
			state.posts.status = 'loading'
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.posts.items = action.payload
			state.posts.status = 'loaded'
		},
		[fetchPosts.rejected]: (state) => {
			state.posts.items = []
			state.posts.status = 'error'
		},
	},
})

const serviceSlice = createSlice({
	name: 'services',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchServices.pending]: (state) => {
			state.services.status = 'loading'
		},
		[fetchServices.fulfilled]: (state, action) => {
			state.services.items = action.payload
			state.services.status = 'loaded'
		},
		[fetchServices.rejected]: (state) => {
			state.services.items = []
			state.services.status = 'error'
		},
	},
})
export const postReducer = postSlice.reducer
export const serviceReducer = serviceSlice.reducer
