const Footer = ({ darkMode }) => {
  return (
    <footer className="footer">
      <p className="footer-text">
        © {new Date().getFullYear()} SkyView · Crafted by <span className="footer-author">Didar Abbas</span>
      </p>
      <p className="footer-powered">Powered by OpenWeatherMap</p>
    </footer>
  )
}

export default Footer