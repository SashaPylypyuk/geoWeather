import React, { FC, useState, ChangeEvent, FormEvent } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import { useHistory } from "react-router-dom";

import { connect } from 'react-redux';
import * as actions from '../redux/actions';

interface Props {
  loadWeatherByName: (q: string) => void,
  weather: Weather[]
}

const useStyles = makeStyles((_theme) => ({
  form: {
    width: '750px',
    margin: '30px auto 50px',
    display: 'flex',
    justifyContent: 'space-between'
  },
  input: {
    minWidth: 500
  }
}))

const Header: FC<Props> = ({ loadWeatherByName, weather }) => {
  const [sity, setSity] = useState('')
  const classes = useStyles();

  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setSity(e.target.value);
  const searchSity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validation = true;

    weather.forEach(item => {
      if (item.name === sity) {
        validation = false;
      }
    })

    if (!validation) {
      window.alert('Please input correct sity')
    } else {
      loadWeatherByName(sity);
    }

    setSity('');
    toHome();
  }
  const toHome = () => {
    history.push('/')
  };
  return (
    <div>
      <form onSubmit={(e) => searchSity(e)} className={classes.form}>
        <TextField className={classes.input} id="standard-basic" label="Sity" value={sity} onChange={handleChange}/>
        <Button type="submit" color='primary' variant="contained">
          Search sity
        </Button>
        <Button variant="contained" color='primary' type="button" onClick={() => toHome()}>
          Home
        </Button>
      </form>
    </div>

  )
}

const mapStateToProps = (state: State) => ({
  weather: state.weather,
})

const mapDispatchToProps = {
  loadWeatherByName: actions.loadWeatherByName,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Header);
