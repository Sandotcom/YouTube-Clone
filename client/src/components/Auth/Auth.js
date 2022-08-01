import React, { useState } from 'react';
import { Avatar, Button, Paper, Grid, Typography, Container } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Input from './Input';
import style from './Auth.module.css'

const Auth = () => {
  const [showPassword, setShowPassword] = useState(false)
  const isSignup = true;

  const handleSubmit = () => {

  }

  const handleChange = () => {

  }

  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <Container component="main" maxWidth='xs'>
        <Paper sx={{ marginTop: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: 2}} elevation={3}>
            <Avatar sx={{ margin: 1 }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignup ? 'Sign Up' : 'Sign In'}</Typography>
            <form onSubmit={handleSubmit}>
              <Grid className={style.input} sx={{ marginTop: 3, display: 'flex', flexDirection: 'column', alignItems: 'center'}} container spacing={2}>
                {
                  isSignup && (
                    <>
                      <Input name='name' label='Name' handleChange={handleChange} autoFocus />
                      {/* <Input name='email' label='Email' handleChange={handleChange} /> */}
                    </>
                  )
                }
                <Input name='email' label='Email Address' handleChange={handleChange} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} type={showPassword ? 'text' : 'password'} handleShowPassword={handleShowPassword} />
                { isSignup && <Input name='confirmPassword' label="Confirm Password" handleChange={handleChange} type="password" />}
              </Grid>
              <Button type='submit' fullWidth variant='contained' color='primary'>
                {isSignup ? 'Sign Up' : 'Sign In' }
              </Button>
            </form>
        </Paper>
    </Container>
  )
}

export default Auth