import React, { useState, useEffect } from 'react';

import { ReactComponent as GpsIcon } from './assets/gps.svg';
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { ReactComponent as CloseIcon } from './assets/close.svg';
import useUserWeatherState from './components/useUserWeatherState';

import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import Hightlights from './components/Hightlights';

import axios from 'axios';
import dateBuilder from './helpers/dateBuilder';

import './App.scss';

function App() {
  const [userWeather, setUserWeather] = useUserWeatherState();
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <div className='container'>
      <div className='left'>
        <div className={`search ${openSearch ? 'open-search' : ''}`}>
          <CloseIcon className='search__close' onClick={() => setOpenSearch(false)} />
          <form className='search__form'>
            <div className='search__input-container'>
              <SearchIcon className='search__icon' />
              <input type='text' className='search__input' placeholder='search location' />
            </div>
            <button type='submit' className='search__btn'>
              Search
            </button>
          </form>

          <ul className='search__results'>
            <li className='search__result-item'>Jakarta</li>
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
          <GpsIcon onClick={() => console.log('get current location')} className='gps-icon' />
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
