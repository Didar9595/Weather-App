import React from 'react'
import {FaArrowDown,FaArrowUp,FaWind} from 'react-icons/fa'
import {BiHappy} from 'react-icons/bi'
import {MdCompress,MdOutlineWaterDrop} from 'react-icons/md'
import { Avatar, Stack, Typography } from '@mui/material'

const Comp1 = ({weather,units,bg}) => {
const tempUnits=units==='metric'?'C':'F';
const windUnits=units==='metric'?'m/s':'m/h';

const cards=[
  {
    id:1,
    icon:<FaArrowDown />,
    title:"Min",
    data:weather.temp_min.toFixed(),
    unit:tempUnits
  },
  {
    id:2,
    icon:<FaArrowUp />,
    title:"Max",
    data:weather.temp_max.toFixed(),
    unit:tempUnits
  },
  {
    id:3,
    icon:<BiHappy />,
    title:"Feels Like",
    data:weather.feels_like.toFixed(),
    unit:tempUnits
  },
  {
    id:4,
    icon:<MdCompress />,
    title:"Pressure",
    data:weather.pressure,
    unit:"hPa"
  },
  {
    id:5,
    icon:<MdOutlineWaterDrop />,
    title:"Humidity",
    data:weather.humidity,
    unit:"%"
  },
  {
    id:6,
    icon:<FaWind />,
    title:"Wind Speed",
    data:weather.speed,
    unit:windUnits
  },
];
  

return (
   <Stack sx={{display:'grid',gridTemplateColumns:{xs:'repeat(2,1fr)',md:'repeat(3,1fr)'},gap:{xs:'1.5em',md:'2em'}}}>
    {
      cards.map(({id,icon,title,data,unit})=>(
        <Stack key={id} sx={{backgroundImage:bg?'linear-gradient(to bottom right,black,#3d333c 60%)':'linear-gradient(to bottom right,#59fff4,#d9faf8 50%)',boxShadow:'2px 2px 10px 1px gray',widht:'fit-content',height:'fit-content',borderRadius:'1em',padding:'1em 1em',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center'}}>
        <Stack direction='row' spacing={0.8} sx={{display:'flex',flexDirection:'row',alignItems:'center'}}>
           {icon}
           <Typography sx={{fontFamily:'Fredoka',fontSize:'1.4rem',fontWeight:'bold'}}>{title}</Typography>
        </Stack>
        <Typography sx={{fontFamily:'Fredoka',fontSize:'1.2rem'}}>{data} {unit}</Typography>
     </Stack>
      ))
    }
    </Stack>
  )
}

export default Comp1
