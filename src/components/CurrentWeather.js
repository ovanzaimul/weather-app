import React from 'react';
import { ReactComponent as LocationIcon } from '../assets/location.svg';

const CurrentWeather = ({ icon, temp, timezone, weatherState, date }) => {
  // const time = new Date();

  return (
    <React.Fragment>
      <div className='weather-icon-container'>
        <div className='weather-icon-bg'></div>
        <img className='weather-state-icon' src={icon} alt='' />
      </div>
      <div className='weather-temp'>
        {temp && Math.round(temp)}
        <span className='temp-scale'>&deg;c</span>
      </div>
      <h2 className='weather-state'>{weatherState}</h2>

      <div className='time'>
        <span>Today</span>
        <span className='dot'>&middot;</span>
        <span className='date'>{date}</span>
      </div>
      <div className='location-box'>
        <LocationIcon className='location-icon' />
        <span className='location-name'>{timezone}</span>
      </div>
    </React.Fragment>
  );
};

export default CurrentWeather;
