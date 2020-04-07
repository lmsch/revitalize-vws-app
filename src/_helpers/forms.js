/**
 * Various helpers for REDUX Form:
 * Includes common validators and render textfield function for integration with MATERIAL UI.
 */

/* REACT IMPORTS */
import React from 'react';
/* THIRD PARTY IMPORTS */
import { TextField } from '@material-ui/core';
import * as _ from 'lodash';

// Validators
export const requiredVal = value => value ? undefined : 'Required'
export const maxLengthVal = max => value => value && value.length > max ? `Must be ${max} characters or less` : undefined
export const numberVal = value => value && isNaN(Number(value)) ? 'Must be a number' : undefined
export const minValueVal = min => value => value && value < min ? `Must be at least ${min}` : undefined

// Render functions
export const renderTextField = ({
    input,
    label,
    meta: { touched, error },
    ...custom
}) => (
    <TextField
      label={label}
      helperText={touched ? error : ''}
      error={touched && _.isString(error)}
      {...input}
      {...custom}
    />
)