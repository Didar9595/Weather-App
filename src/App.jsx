import { useEffect, useState } from 'react'
import { getFormatWeatherData } from './components/weatherService.js'
import Footer from './components/Footer'
import logo from './assets/weather-logo.jpeg'
import WeatherStats from './components/Comp1.jsx'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState('metric')
  const [city, setCity] = useState('mumbai')
  const [inputValue, setInputValue] = useState('')
  const [darkMode, setDarkMode] = useState(false)
  const [loading, setLoading] = useState(true)
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true)
      const data = await getFormatWeatherData(city, units)
      setWeather(data)
      setLoading(false)
    }
    fetchWeatherData()
  }, [city, units])

  const handleSearch = () => {
    if (inputValue.trim()) {
      setCity(inputValue.trim())
      setInputValue('')
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch()
  }

  const toggleUnits = () => {
    setUnits(prev => prev === 'metric' ? 'imperial' : 'metric')
  }

  const getWeatherGradient = (description = '') => {
    const desc = description.toLowerCase()
    if (desc.includes('clear') || desc.includes('sun')) return 'gradient-sunny'
    if (desc.includes('cloud')) return 'gradient-cloudy'
    if (desc.includes('rain') || desc.includes('drizzle')) return 'gradient-rainy'
    if (desc.includes('snow')) return 'gradient-snowy'
    if (desc.includes('thunder') || desc.includes('storm')) return 'gradient-stormy'
    if (desc.includes('mist') || desc.includes('fog') || desc.includes('haze')) return 'gradient-foggy'
    return 'gradient-default'
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
  }

  const weatherGradient = weather ? getWeatherGradient(weather.description) : 'gradient-default'

  return (
    <div className={`app-root ${darkMode ? 'dark' : 'light'}`}>
      <div className={`app-bg ${weatherGradient}`}>

        {/* Navbar */}
        <nav className="navbar">
          <div className="nav-brand">
            <img src={logo} alt="SkyView" className="nav-logo" />
            <span className="nav-title">SkyView</span>
          </div>

          <div className="search-bar">
            <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              value={inputValue}
              onChange={e => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search city..."
              className="search-input"
            />
            <button onClick={handleSearch} className="search-btn">Go</button>
          </div>

          <div className="nav-controls">
            <button className="unit-toggle" onClick={toggleUnits}>
              {units === 'metric' ? '°C → °F' : '°F → °C'}
            </button>
            <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)} aria-label="Toggle theme">
              {darkMode ? (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.166 17.834a.75.75 0 00-1.06 1.06l1.59 1.591a.75.75 0 001.061-1.06l-1.59-1.591zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.166 6.166a.75.75 0 000 1.06l1.59 1.591a.75.75 0 001.061-1.06L7.227 6.167a.75.75 0 00-1.061 0z"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
                </svg>
              )}
            </button>
          </div>
        </nav>

        {/* Main Content */}
        <main className="main-content">
          {loading ? (
            <div className="loading-state">
              <div className="spinner"></div>
              <p>Fetching weather data...</p>
            </div>
          ) : weather ? (
            <div className="weather-layout">

              {/* Left: Primary weather card */}
              <div className="primary-card glass-card">
                <div className="location-row">
                  <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" className="pin-icon">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-2.079 3.151-4.511 3.151-7.327A8.44 8.44 0 0012 2.25a8.44 8.44 0 00-8.438 7.001c0 2.816 1.207 5.248 3.151 7.327a19.58 19.58 0 002.683 2.282 16.975 16.975 0 001.144.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                  </svg>
                  <h1 className="city-name">{weather.name}, {weather.country}</h1>
                </div>

                <div className="time-display">
                  <span className="time">{formatTime(time)}</span>
                  <span className="date">{formatDate(time)}</span>
                </div>

                <div className="temp-display">
                  <img src={weather.iconURL} alt={weather.description} className="weather-icon-lg" />
                  <div className="temp-main">
                    <span className="temperature">{weather.temp.toFixed()}</span>
                    <span className="temp-unit">°{units === 'metric' ? 'C' : 'F'}</span>
                  </div>
                </div>

                <p className="description">{weather.description}</p>

                <div className="feels-row">
                  <span>Feels like {weather.feels_like.toFixed()}°{units === 'metric' ? 'C' : 'F'}</span>
                  <span className="divider">·</span>
                  <span>↓{weather.temp_min.toFixed()}° ↑{weather.temp_max.toFixed()}°</span>
                </div>
              </div>

              {/* Right: Stats grid */}
              <WeatherStats weather={weather} units={units} darkMode={darkMode} />
            </div>
          ) : (
            <div className="error-state">
              <p>City not found. Try a different name.</p>
            </div>
          )}
        </main>

        <Footer darkMode={darkMode} />
      </div>
    </div>
  )
}

export default App