import axios from 'axios';
const KEY = '15b2238ad35774d2a7d5a9f658ca6fdc';
const URL = 'https://api.openweathermap.org/data/2.5/';

export const getWeatherByCord = async (lat: number, lon: number) => {
  try {
    return await axios.get(`${URL}weather?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`).then(res => res.data);
  }
  catch (e) {
    console.error(e)
  }
}

export const getWeatherByName = async (q: string) => {
  try {
    const res =  await axios.get(`${URL}weather?q=${q}&units=metric&appid=${KEY}`).then(res => res.data);
    res.name = q;
    return res;
  }
  catch (e) {
    console.error(e)
  }
}

export const getWeeklyWeather = async (lat: number, lon: number, q: string) => {
  try {
    const res = await axios.get(`${URL}onecall?lat=${lat}&lon=${lon}&units=metric&appid=${KEY}`).then(res => res.data)
    res.name = q;
    return res
  } catch (e) {
    console.error(e)
  }
}
