import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import logg from '../images/login1.jpg'
import {useAuthContext} from '../hooks/useAuthContext';
import { ClassNames } from '@emotion/react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import {useState} from 'react'
import { Navigate } from "react-router-dom";


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

export default function SignUpMUI() {

  const {dispatchs}=useAuthContext();
  const [error,setError]=useState(false)
  const [navigate,setNavigate]=useState(false)


  const handleSubmit = async(event) => {
   
    event.preventDefault();
    
    const data = new FormData(event.currentTarget);
    const formData={
      name:`${data.get('firstName')} ${data.get('lastName')}`,  
      email: data.get('email'),
      password: data.get('password'),
    };

    var url='https://studentfeedback-backend-mu.vercel.app/student/register'
    var baseUrl='https://studentfeedback-backend-mu.vercel.app'

    // const resp=await fetch(`${baseUrl}/student/register`,{
    //     method:'POST',
    //     body: JSON.stringify(formData) ,
    //     headers:{
    //       'Content-Type': 'application/json'
    //     }
    //   })
    const resp=await fetch(url,{
      method:'POST',
      body: JSON.stringify(formData) ,
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


          //window.location.href='/';
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="#" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
    {error&&<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="error" onClose={() => {setError(false)}}>email already exist, please use other email</Alert>
    </Stack>}
    {navigate&&<Navigate to="/viewFeedbacks"></Navigate>}
    </div>
  );
}