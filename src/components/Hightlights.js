import React from 'react';

import './Hightlights.scss';
import { ReactComponent as NavigationIcon } from '../assets/navigation.svg';
import degToCompass from '../helpers/degToCompass';

const Hightlights = ({ windSpeed, windDeg, humidity, visibility, pressure }) => {
  return (
    <div className='hightlights'>
      <h2 className='hightlights__title'>Today’s Hightlights</h2>
      <div className='wind'>
        <h4 className='wind__text'>Wind status</h4>
        <div className='wind__speed'>
          {windSpeed}
          <span className='wind__speed-unit'>m/s</span>
        </div>
        <div className='wind__direction'>
          <NavigationIcon className='wind__icon' />
          <span className='wind__compass'>{degToCompass(windDeg)}</span>
        </div>
      </div>

      <div className='humidity'>
        <h4 className='humidity__text'>Humidity</h4>
        <div className='humidity__percentage'>
          {humidity}
          <span className='humidity__percentage-unit'>%</span>
        </div>
        <div className='humidity__indicator'>
          <span className='humidity__indicator-0'>0</span>
          <span className='humidity__indicator-50'>50</span>
          <span className='humidity__indicator-100'>100</span>
          <div className='humidity__percent-bar'>
            <div style={{ width: humidity + '%' }} className='humidity__percent-fill'></div>
          </div>
          <span className='humidity__indicator-unit'>%</span>
        </div>
      </div>

      <div className='visibility'>
        <h4 className='visibility__text'>Visibility</h4>
        <div className='visibility__box'>
          {/* Math.round((num + Number.EPSILON) * 100) / 100 */}
          {/* 1metre = 0.000621371192 miles */}
          <span className='visibility__value'>{(visibility * 0.000621371192).toFixed(1)}</span>
          <span className='visibility__unit'>miles</span>
        </div>
      </div>

      <div className='air-pressure'>
        <h4 className='air-pressure__text'>Air Pressure</h4>
        {/* 1hpa = 1mb */}
        <div className='air-pressure__box'>
          <span className='air-pressure__value'>{pressure}</span>
          <span className='air-pressure__unit'>mb</span>
        </div>
      </div>
    </div>
  );
};

export default Hightlights;
