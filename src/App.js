import React, { useState, useEffect } from 'react';

import { ReactComponent as GpsIcon } from './assets/gps.svg';
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
// import useUserWeatherState from './components/useUserWeatherState';

import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import Hightlights from './components/Hightlights';

import axios from 'axios';
import dateBuilder from './helpers/dateBuilder';

import './App.scss';

const API_KEY = '48cd239b04c296c52fc40bd62f808664';

function App() {
  // const [userWeather, setUserWeather] = useUserWeatherState();
  const [openSearch, setOpenSearch] = useState(false);
  const [coords, setCoords] = useState({});
  const [userWeather, setUserWeather] = useState({});
  const [query, setQuery] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getUserPostion();
  }, []);

  useEffect(() => {
    const getUserWeather = async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
      );
      setUserWeather(data);
      console.log('latlong call:', data);
    };

    getUserWeather();
  }, [coords]);

  const getUserPostion = () => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        // const { latitude, longitude } = coords;
        // setLatitude(coords.latitude);
        // setLongitude(coords.longitude);
        // getUserWeather(latitude, longitude);
        setCoords({ lat: coords.latitude, lon: coords.longitude });
      },
      () => {
        alert('Could not get your position');
        setCoords({ lon: '106.8451', lat: '-6.2146' });
        console.log("couldn't get your position:", coords);
      }
    );
  };

  const search = async (e) => {
    try {
      e.preventDefault();
      const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);

      console.log('data😍:', data);
      console.log(data.coord);
      setCoords(data.coord);
      setQuery('');
      setOpenSearch(false);
      console.log('coords aft search:', coords);
    } catch (err) {
      setError('Location not found');
    }
  };

  return (
    <div className='container'>
      <div className='left'>
        <div className={`search ${openSearch ? 'open-search' : ''}`}>
          <CloseIcon
            className='search__close'
            onClick={() => {
              setError('');
              setOpenSearch(false);
            }}
          />
          <form className='search__form' onSubmit={search}>
            <div className='search__input-container'>
              <SearchIcon className='search__icon' />
              <input
                type='text'
                className='search__input'
                placeholder='search location'
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button type='submit' className='search__btn'>
              Search
            </button>
          </form>

          <ul className='search__results'>
            {
              error ? (
                <li style={{ color: 'red' }} className='search__error'>
                  {error}
                </li>
              ) : null
              // <li className='search__result-item'>Jakarta</li>
            }
          </ul>
        </div>
        <div className='btn-container'>
          <button
            onClick={() => {
              console.log('open/close');
              setOpenSearch(true);
              console.log(openSearch);
            }}
            className='search-btn'
          >
            Search for places
          </button>
          <GpsIcon onClick={getUserPostion} className='gps-icon' />
        </div>
        {userWeather ? (
          <CurrentWeather
            icon={`http://openweathermap.org/img/wn/${userWeather?.current?.weather[0].icon}@2x.png`}
            temp={userWeather?.current?.temp}
            timezone={userWeather?.timezone}
            weatherState={userWeather?.current?.weather[0]?.description}
            date={dateBuilder(new Date())}
          />
        ) : null}
      </div>
      <div className='right'>
        <WeatherForecast data={userWeather.daily} />
        <Hightlights
          windSpeed={userWeather?.current?.wind_speed}
          windDeg={userWeather?.current?.wind_deg}
          humidity={userWeather?.current?.humidity}
          visibility={userWeather?.current?.visibility}
          pressure={userWeather?.current?.pressure}
        />
      </div>
    </div>
  );
}

export default App;
