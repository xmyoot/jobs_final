import React from 'react'
import { Container, Typography } from '@mui/material'
import Jobs from '../Jobs/Jobs.jsx'


const Home = () => {
  return (
      <Container maxWidth='xl'>
        <Typography 
          sx={{
              pt: 4,
              fontFamily: 'monospace', 
              letterSpacing:'.3rem', 
              color:'inherit', 
              textDecoration:'none', 
              fontWeight: 200
              }} 
          variant='h3' 
          align='center'>
              Remote Junior Developer Jobs
        </Typography>
        <Jobs />
      </Container>
  )
}
export default Home