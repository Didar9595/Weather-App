import React from 'react'
import { Stack, Typography } from '@mui/material'

const Footer = () => {
  return (
    <Stack sx={{marginTop:'2em',display:'flex',flexDirection:'column',width:'100%',alignItems:'center'}}>
       <Typography sx={{fontWeight:'bold', fontFamily:'Fredoka'}}>Copyright &copy; 2024. All rights reserved.</Typography>
       <Typography sx={{fontWeight:'bold', fontFamily:'Fredoka'}}>Created and Maintained by Didar Abbas</Typography>
    </Stack>
  )
}

export default Footer
