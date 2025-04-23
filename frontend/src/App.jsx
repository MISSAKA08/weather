import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    document.title = "Weather App";
  }, []);

  const getWeather = () => {
    fetch(`/weather/${city}`)
      .then(response => response.json())
      .then(data => {
        setWeather(data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Weather App</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <div>
              <h1>Weather App</h1>
              <input
                type="text"
                placeholder="Enter city"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
              <button onClick={getWeather}>Get Weather</button>
              {weather && (
                <div>
                  <h2>Weather in {weather.name}</h2>
                  <p>Temperature: {weather.main.temp}°C</p>
                  <p>Description: {weather.weather[0].description}</p>
                </div>
              )}
            </div>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
