import React from 'react';
import {store} from './store';
import { render } from '@testing-library/react';
import user from '../_reducers';
import { createStore } from 'redux';




const profileStore = createStore(user, defaultState);

profileStore.dispatch();

console.log(profileStore.getState());