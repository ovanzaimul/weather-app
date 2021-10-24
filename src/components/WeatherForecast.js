import React from 'react';
import dateBuilder from '../helpers/dateBuilder';

import './WeatherForecast.scss';

const WeatherForecast = ({ data }) => {
  const showWeatherForecast = () => {
    const dataForecast = data.slice(1, 6);
    return dataForecast.map((weather, index) => (
      <div key={weather.dt} className='card'>
        <h3 className='card__date'>{index === 0 ? 'Tomorrow' : dateBuilder(new Date(weather?.dt * 1000))}</h3>
        <img
          className='card__icon'
          src={data && `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt=''
        />
        <div className='card__min-max'>
          <p className='card__max'>{Math.round(weather.temp.max)}&deg;c</p>
          <p className='card__min'>{Math.round(weather.temp.min)}&deg;c</p>
        </div>
      </div>
    ));
  };

  return <div className='weather-forecast'>{data ? showWeatherForecast() : null}</div>;
};

export default WeatherForecast;
