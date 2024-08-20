import React from 'react';
import { Typography, Grid, TextField, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Box } from '@mui/material';
import "./profile.css";

function ProfileInformation({ user }) {
  return (
    <Box className="bg-white p-4 m-auto p-4 mx-md-0 mx-lg-auto">
      <Typography variant="h5" className='mb-4' gutterBottom>Personal Information</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="First name" disabled={true} variant="outlined" defaultValue={user?.firstName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Last name" disabled={true}  variant="outlined" defaultValue={user?.lastName} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Email" disabled={true}  variant="outlined" defaultValue={user?.email} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField fullWidth label="Username" disabled={true}  variant="outlined" defaultValue={user?.username} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default ProfileInformation
