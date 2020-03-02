/* THIRD PARTY IMPORTS */
import { combineReducers } from 'redux';
/* LOCAL IMPORTS */
import { authentication } from './authentication.reducer';
import { alert } from './alert.reducer';
import { profile } from './profile.reducer'

const rootReducer = combineReducers({
  authentication,
  alert,
  profile,
});

export default rootReducer;
