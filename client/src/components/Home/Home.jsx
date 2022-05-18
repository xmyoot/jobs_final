import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Typography } from '@mui/material'
import { getJobs } from '../../redux/jobsSlice.js'
import Jobs from '../Jobs/Jobs.jsx'

const Home = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getJobs())
  }, [dispatch])

  const { jobs } = useSelector((state) => state.jobs)
  console.log(jobs)
  return (
      <Container maxWidth='xl'>
        <Typography 
          sx={{
              fontFamily: 'monospace', 
              letterSpacing:'.3rem', 
              color:'inherit', 
              textDecoration:'none', 
              fontWeight: 200
              }} 
          variant='h3' 
          align='center'>
              Remote Entry Level Software Jobs
        </Typography>
        <Jobs />
      </Container>
  )
}
export default Home