/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles(theme => ({
  root: {
    width: 300,
  },
  margin: {
    height: theme.spacing(3),
  },
}));

const marks = [
  {
    value: 0,
    label: '0',
  },
  {
    value: 5,
    label: '5',
  },
  {
    value: 10,
    label: '10',
  },
];

function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <div className={classes.margin} />
      <Typography id="discrete-slider-restrict" gutterBottom>
        Smile Meter
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-restrict"
        step={1}
        valueLabelDisplay="auto"
        marks={true, marks}
        min = {0}
        max = {10}
        //marks = {marks}
      />
      <div className={classes.margin} />
      <Typography id="discrete-slider-always" gutterBottom>
        Always visible
      </Typography>
      <Slider
        defaultValue={0}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
        min = {0}
        max = {10}
      />
    </div>
  );
}
