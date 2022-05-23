import React from 'react'
import AddIcon from '@mui/icons-material/Add'
import { Tooltip, Paper, Typography, ListItem, ListItemAvatar, Avatar, ListItemText, Chip, Box } from '@mui/material'

export const Job = ({ job }) => {
  const tags = job.tags.map(
    tag => 
      <Tooltip key={tag} title='Add to Filters' placement='bottom' arrow>
        <Chip sx={{ m: 0.5 }} color='default' size='medium' onClick={()=> console.log('tag clicked!')} icon={<AddIcon />} label={tag} />
      </Tooltip>
  )
  return (
    <Paper elevation={3} sx={{ p: 1, mb: 1.5 }}>
      <ListItem sx={{ justifyContent: 'space-between', display: 'flex' }}>
        <Box>
          <ListItemAvatar>
            <Avatar alt={job.company} src={job.companyLogo} />
          </ListItemAvatar>
          <ListItemText 
            primary={
              
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='h5'
                  color='BlackText.primary'
                  >
                  {job.position}
                  </Typography>
              
            }
            secondary={
              
                <Typography
                  sx={{ display: 'inline' }}
                  component='span'
                  variant='h6'
                  color='GrayText.primary'
                  >
                  <br/>{job.company} &nbsp;
                  <Chip color='default' size='medium' label={job.location} />
                </Typography>
              
            }
            >
          </ListItemText>
        </Box>
        <Box>{tags}</Box>
        <Box>{job.date}</Box>
      </ListItem>
    </Paper>
  )
}
export default Job