import React from 'react'
import { AppBar, Typography, Toolbar, Button, IconButton, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import ManageSearchIcon from '@mui/icons-material/ManageSearch'
import PostAddIcon from '@mui/icons-material/PostAdd'

const Navbar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static' color='inherit'>
            <Toolbar disableGutters sx={{ m: 2 }}>
                <IconButton sx={{ ml: 2, mr: 2 }} color='inherit' component={Link} to='/'>
                    <ManageSearchIcon fontSize='large'/>
                </IconButton>
                <Typography sx={{flexGrow: 1, fontFamily: 'monospace', letterSpacing:'.6rem', color:'inherit', textDecoration:'none', fontWeight: 200}} component={Link} to='/' variant='h4' align='inherit'>
                        Remote Entry Dev
                </Typography>
                <Button startIcon={ <PostAddIcon /> } component={Link} to='/postJob' variant='outlined' color='inherit' sx={{ mr: 2}}>
                    Post Job
                </Button>
            </Toolbar>
        </AppBar>
    </Box>
  )
}
export default Navbar