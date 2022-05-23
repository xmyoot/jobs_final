import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import * as api from '../api/index.js'

export const getJobs = createAsyncThunk(
    'jobs/getJobs',
    async () => {
        const { data } = await api.fetchJobs()
        return data
    }
)

export const postJob = createAsyncThunk(
    'jobs/postJob',
    async (newJob) => {
        const { data } = await api.createJob(newJob)
        console.log(data)
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
            state.status = 'success'
            state.jobs = action.payload
        })
        builder.addCase(getJobs.rejected, (state, action) => {
            state.status = 'failure'
        })
        builder.addCase(postJob.pending, (state, action) => {
            state.status = 'loading'
        })
        builder.addCase(postJob.fulfilled, (state, action) => {
            state.status = 'success'
            state.jobs.push(action.payload)
        })
        builder.addCase(postJob.rejected, (state, action) => {
            state.status = 'failure'
        })
    }
})
export default jobsBoardSlice.reducer