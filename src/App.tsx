import React, { FC, useEffect } from 'react';

import { Switch, Route } from 'react-router-dom';

import { connect } from 'react-redux';
import * as actions from './redux/actions';

import MainPage from './components/MainPage';
import WeatherPage from './components/WeatherPage';
import Header from './components/Header';

import { createMuiTheme, ThemeProvider  } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#2060f6',
    },
    secondary: {
      main: '#2c2c2c',
    },
  },
});

interface Props {
  loadWeatherByCord: (lat: number, lon: number) => void;
}

const App: FC<Props> = ({ loadWeatherByCord }) => {
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      loadWeatherByCord(lat, lon)
    })
  }, [])

  return (
    <>
      <ThemeProvider theme={theme}>
        <Header />
        <Switch>
          <Route path="/" exact component={MainPage} />
          <Route path="/:city" component={WeatherPage} />
        </Switch>
      </ThemeProvider>

    </>
  );
}

const mapDispatchToProps = {
  loadWeatherByCord: actions.loadWeatherByCord,
};

export default connect(
  null,
  mapDispatchToProps,
)(App);
