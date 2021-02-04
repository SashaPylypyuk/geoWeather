import { Type } from './actions';
import { AnyAction } from 'redux';

const initialState: State = {
  weather: [],
  weeklyWeather: [],
  isLoading: false
}

export const reducer = (state = initialState, action: AnyAction): State => {
  switch (action.type) {
    case Type.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      }
    case Type.SET_WEATHER:
      return {
        ...state,
        weather: [...state.weather, action.weather]
      }
    case Type.SET_WEEKLY_WEATHER:
      return {
        ...state,
        weeklyWeather: [...state.weeklyWeather, action.weeklyWeather]
      }
    default:
      return state;
  }
}

