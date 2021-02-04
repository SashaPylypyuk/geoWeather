import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import Loader from "react-loader-spinner";

const styles = makeStyles(() => ({
  loader: {
    width: 50,
    margin: '0 auto'
  }
}))

const Spinner = () => {
  const classes = styles();

  return (
    <div className={classes.loader}>
      <Loader
        type="Oval"
        color="#00BFFF"
        height={50}
        width={50}
        timeout={0}
      />
    </div>
  )
}

export default Spinner;
