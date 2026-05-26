import { FaArrowDown, FaArrowUp, FaWind, FaEye, FaTachometerAlt, FaTint } from 'react-icons/fa'
import { WiHumidity } from 'react-icons/wi'

const WeatherStats = ({ weather, units, darkMode }) => {
  const tempUnit = units === 'metric' ? 'C' : 'F'
  const windUnit = units === 'metric' ? 'm/s' : 'mph'

  const getWindDirection = (deg) => {
    const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW']
    return dirs[Math.round(deg / 45) % 8]
  }

  const getHumidityLabel = (h) => {
    if (h < 30) return { label: 'Dry', color: '#f59e0b' }
    if (h < 60) return { label: 'Comfortable', color: '#10b981' }
    if (h < 80) return { label: 'Humid', color: '#3b82f6' }
    return { label: 'Very Humid', color: '#8b5cf6' }
  }

  const getPressureLabel = (p) => {
    if (p < 1000) return 'Low pressure'
    if (p < 1013) return 'Below normal'
    if (p < 1020) return 'Normal'
    return 'High pressure'
  }

  const humidityInfo = getHumidityLabel(weather.humidity)

  const stats = [
    {
      icon: <FaArrowDown size={18} />,
      label: 'Min Temp',
      value: `${weather.temp_min.toFixed()}°${tempUnit}`,
      sub: 'Today\'s low',
      accent: '#60a5fa',
    },
    {
      icon: <FaArrowUp size={18} />,
      label: 'Max Temp',
      value: `${weather.temp_max.toFixed()}°${tempUnit}`,
      sub: 'Today\'s high',
      accent: '#f97316',
    },
    {
      icon: <FaTint size={18} />,
      label: 'Humidity',
      value: `${weather.humidity}%`,
      sub: humidityInfo.label,
      accent: humidityInfo.color,
      progress: weather.humidity,
    },
    {
      icon: <FaTachometerAlt size={18} />,
      label: 'Pressure',
      value: `${weather.pressure} hPa`,
      sub: getPressureLabel(weather.pressure),
      accent: '#a78bfa',
    },
    {
      icon: <FaWind size={18} />,
      label: 'Wind Speed',
      value: `${weather.speed} ${windUnit}`,
      sub: weather.deg ? `${getWindDirection(weather.deg)} direction` : 'Variable',
      accent: '#34d399',
    },
    {
      icon: <FaEye size={18} />,
      label: 'Feels Like',
      value: `${weather.feels_like.toFixed()}°${tempUnit}`,
      sub: weather.feels_like < weather.temp ? 'Colder than actual' : 'Warmer than actual',
      accent: '#fb7185',
    },
  ]

  return (
    <div className="stats-panel">
      <h2 className="stats-heading">Current Conditions</h2>
      <div className="stats-grid">
        {stats.map((stat, i) => (
          <div key={i} className="stat-card glass-card" style={{ '--accent': stat.accent }}>
            <div className="stat-icon" style={{ color: stat.accent }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-sub">{stat.sub}</span>
            </div>
            {stat.progress !== undefined && (
              <div className="progress-bar-wrap">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${stat.progress}%`, background: stat.accent }}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default WeatherStats