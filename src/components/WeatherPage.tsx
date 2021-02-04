import React, { FC, useEffect, useState } from 'react';

import { useParams } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';

import { connect } from 'react-redux';
import * as actions from '../redux/actions';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

import Spinner from './Spinner';

const useStyles = makeStyles((_theme) => ({
  wrapper: {
    width: 300,
    margin: '0 auto'
  },
  title: {
    fontSize: 18,
    width: 100,
    margin: '0 auto 50px'
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 20,
    fontSize: 14
  }
}))

interface Props {
  weather: Weather[]
  weeklyWeather: WeeklyWeather[],
  loadWeeklyWeather: (lat: number, lon: number, q: string) => void,
  loadWeatherByName: (q: string) => void
}

const WeatherPage: FC<Props> = ({ weather, weeklyWeather, loadWeeklyWeather, loadWeatherByName }) => {
  const [currentWeather, setCurrentWeather] = useState<WeeklyWeather>()
  const [isWeatherIsEmpty, setWeatherEmpty] = useState(false);
  let { city } = useParams();

  const classes = useStyles();

  useEffect(() => {
    if (!weather.length) {
      loadWeatherByName(city)
      setWeatherEmpty(true)
    }
    loadWeekly();
  }, [])

  const loadWeekly = () => {
    weather.forEach(item => {
      if (item.name === city) {
        loadWeeklyWeather(item.coord.lat, item.coord.lon, city)
      }
    })
  }

  if (isWeatherIsEmpty && weather.length) {
    loadWeekly();
    setWeatherEmpty(false)
  }

  if (weeklyWeather.length && !currentWeather) {
    weeklyWeather.forEach(item => {
      if (item) {
        if (item.name === city){
          setCurrentWeather(item)
        }
      }
    })
  }

  const formatDay = (dt: number, type: string) => {
    const date = new Date(dt * 1000);
    let result;
    switch (type) {
      case 'day.month':
        let day = `${date.getDate()}`;
        if (date.getDate() <= 9) {
          day = `0${date.getDate()}`
        }

        let month = `${date.getMonth() + 1}`
        if (date.getMonth() <= 9) {
          month = `0${date.getMonth() + 1}`
        }
        result = day + '.' + month;
      break;
      case 'hour:min:sec':
        let hour = date.getHours()
        let min = date.getMinutes()
        let sec = date.getSeconds()

        result = `${hour}:${min}:${sec}`
      break;
      default:
        result = 'error';
    }


    return result;
  }


  return (
    <div>
      {currentWeather ? (
        <>
          <p className={classes.title}>
            {currentWeather.name}
          </p>
          <Tabs>
            <TabList>
              {currentWeather.daily.map(day => (
                <Tab key={day.dt}>
                  {formatDay(day.dt, 'day.month')}
                </Tab>
              ))}
            </TabList>
            {currentWeather.daily.map(day => (
              <TabPanel key={day.dt}>
                <div className={classes.wrapper}>
                  <p className={classes.text}>
                    Temperature is:
                    <span className={classes.bold}>
                      {day.temp.day}
                    </span>
                    and feels like
                    <span className={classes.bold}>
                      {day.feels_like.day}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Sunrise at:
                    <span className={classes.bold}>
                      {formatDay(day.sunrise, 'hour:min:sec')}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Sunset at:
                    <span className={classes.bold}>
                      {formatDay(day.sunset, 'hour:min:sec')}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Min temperature is:
                    <span className={classes.bold}>
                      {day.temp.min}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Max tempearture is:
                    <span className={classes.bold}>
                      {day.temp.max}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Pressure is:
                    <span className={classes.bold}>
                      {day.pressure}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Humidity is:
                    <span className={classes.bold}>
                      {day.humidity}
                    </span>
                  </p>
                  <p className={classes.text}>
                    Wind speed is:
                    <span className={classes.bold}>
                      {day.wind_speed}
                    </span>
                  </p>
                </div>
              </TabPanel>
            ))}
          </Tabs>
        </>
      ) : (
        <Spinner />
      )}

    </div>
  )
}

const mapStateToProps = (state: State) => ({
  weeklyWeather: state.weeklyWeather,
  weather: state.weather,
})

const mapDispatchToProps = {
  loadWeeklyWeather: actions.loadWeeklyWeather,
  loadWeatherByName: actions.loadWeatherByName,
};

export default connect(mapStateToProps, mapDispatchToProps)(WeatherPage)
