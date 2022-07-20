import React from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';

const Auth = () => {
  const isSignup = true;

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  return (
    <Container component="main" maxWidth='xs'>
        <Paper sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2}} elevation={3}>
            <Avatar sx={{ margin: 1 }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form onSubmit={handleSubmit}>
              <Grid sx={{ marginTop: 3}} container spacing={2}>
                {
                  isSignup && (
                    <>
                      <Input name='name' label='Name' handleChange={handleChange} />
                    </>
                  )
                }
              </Grid>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth