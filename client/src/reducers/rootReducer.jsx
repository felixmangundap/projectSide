import { combineReducers } from 'redux';
import profileReducer, * as fromProfile from './profileReducer';

export default combineReducers({
  profileReducer,
});

export const profileWithState = state => fromProfile.withState(state.actionTracker);
