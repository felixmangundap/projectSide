import { combineReducers } from 'redux';
import profileReducers, * as fromProfile from './profileReducers';

export default combineReducers({
  profileReducers,
});

export const profileWithState = state => fromProfile.withState(state.profileReducers);
