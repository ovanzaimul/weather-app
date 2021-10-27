import { useEffect, useState } from 'react';
import axios from 'axios';

const API_KEY = '48cd239b04c296c52fc40bd62f808664';

function useUserWeatherState() {
  const [weather, setWeather] = useState({});
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // useEffect(() => {

  //   getUserPostion();
  // }, [latitude, longitude]);

  const getUserWeather = async (latt, long) => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latt}&lon=${long}&exclude=minutely,hourly&units=metric&appid=${API_KEY}`
    );
    setWeather(data);
    console.log(data);
  };

  return [weather, setWeather];
}

export default useUserWeatherState;
