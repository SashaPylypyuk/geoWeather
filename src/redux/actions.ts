import { Dispatch } from 'redux';
import { getWeatherByCord, getWeatherByName, getWeeklyWeather } from '../api/getWeather';

export const Type = {
  SET_IS_LOADING: 'SET_IS_LOADING',
  SET_WEATHER: 'SET_WEATHER',
  SET_WEEKLY_WEATHER: 'SET_WEEKLY_WEATHER'
}

export const setIsLoad = (isLoading: boolean) => ({ type: Type.SET_IS_LOADING, isLoading });

export const setWeather = (weather: Weather) => ({
  type: Type.SET_WEATHER,
  weather: weather
})

export const setWeeklyWeather = (weeklyWeather: WeeklyWeather) => ({
  type: Type.SET_WEEKLY_WEATHER,
  weeklyWeather: weeklyWeather
})


export const loadWeeklyWeather = (lat: number, lon: number, q: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoad(true))

    const res = await getWeeklyWeather(lat, lon, q);

    if (res) dispatch(setWeeklyWeather(res))
    dispatch(setIsLoad(false))

    return res
  }
}

export const loadWeatherByCord = (lat: number, lon: number) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoad(true))

    const res = await getWeatherByCord(lat, lon);

    if (res) dispatch(setWeather(res))
    dispatch(setIsLoad(false))

    return res
  }
}

export const loadWeatherByName = (q: string) => {
  return async (dispatch: Dispatch) => {
    dispatch(setIsLoad(true))

    const res = await getWeatherByName(q);
    if (res) dispatch(setWeather(res))
    dispatch(setIsLoad(false))

    return res
  }
}
