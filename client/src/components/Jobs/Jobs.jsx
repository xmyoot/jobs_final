import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getJobs } from '../../redux/jobsSlice.js'
import { List, Typography, Container } from '@mui/material'
import Job from './Job/Job.jsx'

const Jobs = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getJobs())
  }, [dispatch])
  
  const { jobs } = useSelector((state) => state.jobs)
  console.log(jobs)
  const allJobsAsList = jobs.map(
    job => <Job key={job._id} job={job} onClick={ () => {}} />
  )
  return (
    <Container maxWidth='lg'>
      <List sx={{ width: '100%', bgcolor: 'background.paper'}}>
        <Typography sx={{ m: 4 }} variant="h6" component="h1">
                Found {jobs.length} Jobs
        </Typography>
        {allJobsAsList}
      </List>
    </Container>
    )
  }
  export default Jobs