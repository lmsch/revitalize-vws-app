/* THIRD PARTY IMPORTS */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
/* LOCAL IMPORTS */
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { profile } from './profile.reducer'

const rootReducer = combineReducers({
  authentication,
  alert,
  profile,
  form,
});

export default rootReducer;
