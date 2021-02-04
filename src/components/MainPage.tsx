import React, { FC } from 'react';

import { connect } from 'react-redux';

import WeatherCard from './WeatherCard';
import Spinner from './Spinner';

interface Props {
  weather: Weather[],
}

const MainPage: FC<Props> = ({ weather }) => {
  return (
    <div className="App">
      {weather.length ? weather!.map(weather => (
        <WeatherCard weather={weather} key={weather.name}/>
      )) : (
        <Spinner />
      )}

    </div>
  );
};

const mapStateToProps = (state: State) => ({
  weather: state.weather,
})

export default connect(
  mapStateToProps,
  null,
)(MainPage);
