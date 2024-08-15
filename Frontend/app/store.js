import { configureStore } from '@reduxjs/toolkit'
import feedbackReducer from '../features/feedback/feedbackSlice'

export const store = configureStore({
    reducer: feedbackReducer,
})