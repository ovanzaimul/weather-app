import React, { useState, useEffect } from 'react';

import useUserWeatherState from './components/useUserWeatherState';

import CurrentWeather from './components/CurrentWeather';
import WeatherForecast from './components/WeatherForecast';
import Hightlights from './components/Hightlights';

import axios from 'axios';
import dateBuilder from './helpers/dateBuilder';

import './App.scss';

function App() {
  const [userWeather, setUserWeather] = useUserWeatherState();

  return (
    <div className='container'>
      {userWeather ? (
        <CurrentWeather
          icon={`http://openweathermap.org/img/wn/${userWeather?.current?.weather[0].icon}@2x.png`}
          temp={userWeather?.current?.temp}
          timezone={userWeather?.timezone}
          weatherState={userWeather?.current?.weather[0]?.description}
          date={dateBuilder(new Date())}
        />
      ) : null}
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
