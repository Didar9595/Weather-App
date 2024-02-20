import { useEffect, useState } from 'react'
import { Stack, Typography, Button, Switch, TextField, Avatar, } from '@mui/material'
import { getFormatWeatherData } from './components/weatherService.js'
import Comp1 from './components/Comp1'
import Footer from './components/Footer'
import logo from './assets/weather-logo.jpeg'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [city, setCity] = useState('mumbai')
  const [bg, setBg] = useState(false)



  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormatWeatherData(city, units);
      setWeather(data)
      console.log(data)
    };
    fetchWeatherData();
  }, [city, units]);

  const handleUnitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText

    const isCelsius = currentUnit === 'C';
    button.innerText = isCelsius ? 'F' : 'C';
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterKeyPressed = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value)
    }
    console.log(city)
  }

  const handleChange = () => {
    setBg(!bg)
  }
  return (
    <Stack sx={{ width: '100%', backgroundColor: bg ? '#E5E5CB' : '#d9faf8', color: bg ? 'white' : 'black', height: { xs: 'fit-content' ,xl:'100vh'}, }}>
      {
        weather && (
          <Stack>
            <Stack sx={{width:'100%', display: 'flex', flexDirection:{xs:'column',md:'row'} }}>
              <Stack sx={{width:{xs:'99%',md:'50%'},display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:{md:'5em'}}}>
              <Avatar variant='square' src={logo} alt="logo" sx={{ mixBlendMode: 'multiply', width: { xs: '150px', sm: '180px', md: '240px' }, height: {xs:'120px',sm:'160px',md:'180px'} }} />
                 <input onKeyDown={enterKeyPressed} type="text" name="city" placeholder="Enter City Name..." style={{ border: 'none', borderRadius: '3em', padding: '0.9em 2em', fontFamily: 'Fredoka' ,}} ></input>
              </Stack>
              <Stack sx={{width:{xs:'99%',md:'50%'},display:'flex',flexDirection:'row',justifyContent:{xs:'space-around',md:'space-between'},alignItems:'center',paddingRight:{md:'5em'}}}>
              <Button variant='contained' onClick={(e) => handleUnitsClick(e)} sx={{marginLeft:{md:'1em'},backgroundImage: bg ? 'linear-gradient(to bottom right,black,#3d333c)' : 'linear-gradient(to bottom right,#59fff4,#d9faf8)', color: bg ? 'white' : 'black' }}>F</Button>
              <Stack direction='row'>
                <Switch size='small' onChange={handleChange} />
                <Typography sx={{ fontFamily: 'Fredoka' }}>{bg ? 'Light Mode' : 'Dark Mode'}</Typography>
              </Stack>
              </Stack>

            </Stack>
            <Stack sx={{ marginTop: '2em', display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
              <Stack sx={{ width: { xs: '95%', sm: '70%', md: '80%' }, height: 'fit-content', display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: '3em', md: '6em' }, alignItems: { md: 'center' } }}>
                <Stack direction='column' sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundImage: bg ? 'linear-gradient(to bottom right,black,#3d333c 80%)' : 'linear-gradient(to bottom right,#59fff4,#d9faf8 50%)', padding: { xs: '2em 0em', sm: '3em 0em', md: '5em 6em' }, borderRadius: '2em', boxShadow: '0px 0px 15px 0px gray' }}>
                  <Typography variant='h4' sx={{ fontFamily: 'Fredoka' }}>{weather.name},{weather.country}</Typography>
                  <Typography variant='h2' sx={{ fontFamily: 'Fredoka' }}>{weather.temp.toFixed()} {units === 'metric' ? 'C' : 'F'}</Typography>
                  <img src={weather.iconURL} alt="weatherIcon" />
                  <Typography variant='h4' sx={{ fontFamily: 'Fredoka', }}>{weather.description}</Typography>
                </Stack>
                <Comp1 weather={weather} units={units} bg={bg} />
              </Stack>
              <Footer />
            </Stack>
          </Stack>
        )
      }
    </Stack>
  )
}

export default App
