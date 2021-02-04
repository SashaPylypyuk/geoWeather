// eslint-disable-next-line
/// <reference types="react-scripts" />


interface Weather {
  base: string,
  clouds: {
    all: number
  }[],
  cod: number,
  coord: {
    lat: number,
    lon: number
  },
  dt: number,
  id: number,
  main: {
    feels_like: number,
    humidity: number,
    pressure: number,
    temp: number,
    temp_max: number,
    temp_min: number
  },
  name: string,
  sys: {
    country: string,
    id: number,
    sunrise: number,
    sunset: number,
    type: number
  },
  timezone: number,
  visibility: number,
  weather: {
    description: string,
    icon: string,
    id: number,
    main: string
  }[],
  wind: {
    deg: number,
    speed: number
  }
}

interface PartOfWeeklyWeather {
  clouds: number,
  dew_point: number,
  dt: number,
  feels_like: {
    day: number,
    night: number,
    eve: number,
    morn: number
  },
  humidity: number,
  pop: number,
  pressure: number,
  snow: number,
  sunrise: number,
  sunset: number,
  temp: {
    day: number,
    night: number,
    eve: number,
    morn: number,
    max: number,
    min: number,
  },
  uvi: number,
  visibility?: number,
  weather: {
    description: string,
    icon: string,
    id: number,
    main: string
  }[],
  wind_deg: number,
  wind_speed: number
}

interface WeeklyWeather {
  name: string,
  current: PartOfWeeklyWeather,
  daily: PartOfWeeklyWeather[],
  hourly: PartOfWeeklyWeather[],
  lat: number,
  lon: number,
  timezone: string,
  timezone_offst: number,
  minutely: {
    dt: number,
    precipitation: number,
  }[]
}

interface State {
  weather: Weather[],
  weeklyWeather: WeeklyWeather[],
  isLoading: boolean
}

