import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../api/index.js'

export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async () => {
        const { data } = await api.fetchJobs()
        return data
    }
)

const jobsBoardSlice = createSlice({
    name: 'jobs',
    initialState: { jobs : [], status: null },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getJobs.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(getJobs.fulfilled, (state, action) => {
            state.state = 'success'
            state.jobs = action.payload
        })
        builder.addCase(getJobs.rejected, (state, action) => {
            state.state = 'failure'
        })
    }
})
export default jobsBoardSlice.reducer