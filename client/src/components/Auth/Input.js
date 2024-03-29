import React from 'react'
import { TextField, Grid, InputAdornment, IconButton } from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const Input = ({ name, label, handleChange, autoFocus, type, handleShowPassword }) => {
  return (
    <Grid item>
      <TextField
        sx={{ width: '100%'}}
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        label={label}
        autoFocus={autoFocus}
        type={type}
        InputProps={name === 'password' && {
          endAdornment: (
            <InputAdornment position='end'>
              <IconButton onClick={handleShowPassword}>
                {type === 'password' ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />
    </Grid>
  )
}

export default Input