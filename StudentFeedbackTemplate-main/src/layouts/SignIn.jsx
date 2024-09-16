import * as React from 'react';

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import logg from '../images/login1.jpg'
import {useAuthContext} from '../hooks/useAuthContext'; 
import { Navigate } from "react-router-dom";
import {useState} from 'react'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      {' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();
export default function SignIn() {

   const {dispatchs}=useAuthContext();
   const [navigate,setNavigate]=useState(false)
   const [error,setError]=useState(false)

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    /* console.log({
      email: data.get('email'),
      password: data.get('password'),
    }); */
   
     const student={
      email:data.get('email'),
      password:data.get('password')
     }

     var url='http://localhost:3005/student/login';
     var baseUrl='https://student-feedback-portal-pyoeyxxmi-shankar9834.vercel.app'
    //  var newUrl=`${baseUrl}/student/login`
    const newUrl=url;
     const resp=await fetch(newUrl,{
      method:'POST',
      body: JSON.stringify(student) ,
      headers:{
        'Content-Type': 'application/json'
      }
    })

    if(resp.ok)
    {
        const res= await resp.json();
        //console.log(res.student)
        localStorage.setItem('user',JSON.stringify(res));
        dispatchs({type:'LOGIN',payload:res}); 
       // window.location.href='/';

       setNavigate(true);
    }else{
      setError(true)
    } 
};

  return (
    <div className='card1' style={{ 
      backgroundImage: `url(${logg})`
    }}>

    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
          
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    {navigate&&<Navigate to="/viewFeedbacks"></Navigate>}
    {error&&<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => {setError(false)}}>email or password is wrong</Alert>
      
    </Stack>}
    </div>
  );
}