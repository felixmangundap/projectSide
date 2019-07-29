import {
  call,
  // put,
  // select,
} from 'redux-saga/effects';

const sagaDefs = [];
export default sagaDefs;

sagaDefs.push({
  actionType: 'SIMPLE_ACTION',
  work: function* work(action) {
    const { name } = action.payload;

    const response = yield call('localhost:3000/api', name);
    response.name = name;
  },
});
