import React from 'react'
import { AppBar, Typography, Container, Toolbar } from '@mui/material'
import { Link } from 'react-router-dom'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'

const Navbar = () => {
  return (
    <AppBar position='static' color='inherit'>
        <Container maxWidth='xl'>
            <Toolbar disableGutters>
                <ManageSearchIcon sx={{ display: { xs: 'flex', md: 'flex' }}} fontSize='large'/>
                <Typography 
                    sx={{
                        ml: 1,
                        display: { xs:'flex', md:'flex' }, 
                        fontFamily: 'monospace', 
                        letterSpacing:'.6rem', 
                        color:'inherit', 
                        textDecoration:'none', 
                        fontWeight: 700
                        }} 
                    component={Link} 
                    to='/' 
                    variant='h4' 
                    align='left'>
                        Remote Entry Dev
                </Typography>
            </Toolbar>
        </Container>
    </AppBar>
  )
}
export default Navbar