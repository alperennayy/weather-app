import React, { useState } from 'react'
import axios from 'axios'
import './Weather.css'
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import humidity_icon from '../assets/humidity.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'

let BASE_URL = "http://api.weatherapi.com/v1/current.json"
let API_KEY = "714100402a9942d4b89111831251307"


const getWeatherIcon = (code) => {
    if (code === 1000) return clear_icon;
    if (code >= 1003 && code <= 1009) return cloud_icon;
    if (code >= 1030 && code <= 1135) return drizzle_icon;
    if (code >= 1063 && code <= 1195) return rain_icon;
    if (code >= 1066 && code <= 1219) return snow_icon;
    return clear_icon;
}

function Weather() {
    const [city, setCity] = useState("")
    const [weatherTemp, setWeatherTemp] = useState()
    const [weatherHum, setWeatherHum] = useState()
    const [weatherWind, setWeatherWind] = useState()
    const [location, setLocation] = useState()
    const [weatherIcon, setWeatherIcon] = useState(clear_icon)

    const search = async (e) => {
        e.preventDefault()
        if (!city) return;
        const response = await axios.get(`${BASE_URL}?key=${API_KEY}&q=${city}`)
        setWeatherTemp(response.data.current.temp_c)
        setWeatherHum(response.data.current.humidity)
        setWeatherWind(response.data.current.wind_kph)
        setLocation(city)

        setWeatherIcon(getWeatherIcon(response.data.current.condition.code))
    }

    return (
        <div className='weather'>
            <div className="search-bar">
                <input type="text" placeholder='Search' value={city} onChange={(e) => setCity(e.target.value)} />
                <img src={search_icon} alt="" onClick={search} />
            </div>
            <img src={weatherIcon} alt="" className='weather-icon' />
            <p className='temperature'>{weatherTemp}°C</p>
            <p className='location'>{location}</p>
            <div className="weather-data">
                <div className="col">
                    <img src={humidity_icon} alt="" />
                    <div>
                        <p>{weatherHum} %</p>
                        <span>Humidity</span>
                    </div>
                </div>
                <div className="col">
                    <img src={wind_icon} alt="" />
                    <div>
                        <p>{weatherWind} Km/h</p>
                        <span>Wind Speed</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather