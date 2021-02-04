import React, { FC } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { useHistory } from 'react-router-dom';

interface Props {
  weather: Weather
}

const useStyles = makeStyles({
  cardWrapper: {
    width: '300px',
    margin: '0px auto 20px'
  },
  bold: {
    fontWeight: 'bold'
  },
  mb: {
    marginBottom: 10
  },
  mb3: {
    marginBottom: 30
  },
  text: {
    fontSize: 14
  },
  link: {
    textDecoration: 'none',
    color: '#000'
  }
})

const WeatherCard: FC<Props> = ({ weather }) => {
  const classes = useStyles();
  const history = useHistory();

  const toPage = (route: string) => {
    history.push(`/${route}`)
  }
  return (
    <div>
      <Card className={classes.cardWrapper}>
        <CardContent>
          <Typography
            className={`${classes.bold} ${classes.mb3}`}
          >
            {weather.name}
          </Typography>
          <Typography
            className={`${classes.text} ${classes.mb}`}
          >
            Tempereture is: <span className={classes.bold}>{weather.main.temp}</span>
          </Typography>
          <Typography
            className={`${classes.text} ${classes.mb}`}
          >
            Feels like: <span className={classes.bold}>{weather.main.feels_like}</span>
          </Typography>
          <Typography
            className={`${classes.text} ${classes.mb}`}
          >
            Humidity is:<span className={classes.bold}>{weather.main.humidity}</span>
          </Typography>
          <CardActions>
            <Button size="small" color='primary' onClick={() => toPage(weather.name)} >
              Click for more information
            </Button>
          </CardActions>
        </CardContent>
      </Card>
    </div>


);
}

export default WeatherCard;
