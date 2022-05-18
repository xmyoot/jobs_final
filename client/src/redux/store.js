import { configureStore } from '@reduxjs/toolkit'
import jobsReducer from './jobsSlice.js'

export const store = configureStore({
    reducer: {
        jobs: jobsReducer
    }
})