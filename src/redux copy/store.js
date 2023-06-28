import { configureStore } from '@reduxjs/toolkit'
import { postReducer } from './slices/posts'
import { authReducer } from './slices/auth'
import { serviceReducer } from './slices/services'

const store =  configureStore({
    reducer: {
        posts: postReducer,
        services: serviceReducer,
        auth: authReducer
    }
})

export default store