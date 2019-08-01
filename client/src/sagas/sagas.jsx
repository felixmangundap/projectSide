import { all } from 'redux-saga/effects';

import profileSaga from './profileSagas';

export default function* sagas() {
  yield all([
    profileSaga(),
  ]);
}
