import React, { useState } from 'react'

const weather = () => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [weather, setWeather] = useState('');

  const APIKey = "05211ee70013967b1574a2d1889f7ebd";
  const handleData = async () =>{
    try{
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`);
    const data = await res.json();
    setWeather(data);

    }catch{
      setError(error)
    }
  } 
  return (
    <>
      <h1>Weather app</h1>
      <input type='text' value={city} onChange={(e)=>setCity(e.target.value)}></input>
      <button onClick={handleData}>Search</button>
      {error && <p style={{color: red , marginTop: "10px"}}></p>}
      {weather && <div style={{ marginTop: "20px" }}>
          <h3>{weather.name}</h3>
          <p>{weather.weather[0].description}</p>
          <p>🌡️ {weather.main.temp} °C</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
          <p>🌬️ Wind: {weather.wind.speed} m/s</p>
        </div>
        
      }

    </>
  )
}

export default weather