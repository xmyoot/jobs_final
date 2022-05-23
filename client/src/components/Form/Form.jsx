import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { postJob } from '../../redux/jobsSlice.js'
import { TextField, Button, Typography, Box, Avatar, Container, Grid } from '@mui/material'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import SendIcon from '@mui/icons-material/Send'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material/styles'

const Form = () => {
    const [jobData, setJobData] = useState({
        company: '',
        position: '',
        jobUrl: '',
        companyUrl: '',
        location: '',
        contactEmail: ''
    })
    const dispatch = useDispatch()
    let navigate = useNavigate()

    let theme = createTheme()
    theme = responsiveFontSizes(theme)
    
    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(jobData)
        dispatch(postJob(jobData))
        navigate('/')
    }
    
    return (
        <ThemeProvider theme={theme}>
            <Container component='main' maxWidth='sm'>
                <CssBaseline />
                <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <Avatar sx={{ m: 1, bgcolor: 'text.primary' }}>
                        <ManageSearchIcon fontSize='large'/>
                    </Avatar>
                    <Typography component='h1' variant='h3'>
                        Post Job
                    </Typography>
                    <Typography variant='h6'>
                        Additional Details
                    </Typography>
                    <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth autoFocus name='company' variant='outlined' label='Company' value={jobData.company} onChange={(e) => setJobData({...jobData,company : e.target.value})} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth name='position' variant='outlined' label='Position' value={jobData.position} onChange={(e) => setJobData({...jobData, position: e.target.value})} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth name='location' variant='outlined' label='Location' value={jobData.location} onChange={(e) => setJobData({...jobData, location: e.target.value})} />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField required fullWidth name='contactEmail' variant='outlined' label='Contact Email' value={jobData.contactEmail} onChange={(e) => setJobData({...jobData, contactEmail: e.target.value})} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name='jobUrl' variant='outlined' label='Job URL' value={jobData.jobUrl} onChange={(e) => setJobData({...jobData, jobUrl: e.target.value})} />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField required fullWidth name='companyUrl' variant='outlined' label='Company URL' value={jobData.companyUrl} onChange={(e) => setJobData({...jobData, companyUrl: e.target.value})} />
                            </Grid>
                        </Grid>
                        <Button fullWidth type='submit' size='large' startIcon={ <SendIcon /> } variant='contained' sx={{ mt: 3, mb: 2 }}>
                            Submit Job
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}

export default Form