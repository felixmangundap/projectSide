import * as effects from 'redux-saga/effects';

import profileSagaDefs from './profileSagas';

import { creators, types } from './actions';
import { actionTrackerWithState } from './reducers';
import auth from './api/auth/auth0';

const sagaDefs = [
  ...profileSagaDefs,
];

function* startTrackingAction(action) {
  const actionState = yield effects.select(actionTrackerWithState);
  const activeAction = actionState.isActive(
    action.type,
    action.actionTrackingField
  );
  if (activeAction) {
    // eslint-disable-next-line no-console
    console.info('CAREFUL, ACTION is already ACTIVE', action.type, action.actionTrackingField);
  }

  const startAction = creators.actionTrackerStart(
    action.type,
    action.actionTrackingField
  );
  yield effects.put(startAction);
}

function* stopActionTracker(action) {
  const stopAction = creators.actionTrackerStop(
    action.type,
    action.actionTrackingField
  );
  yield effects.put(stopAction);
}

function* statePreChecksPassed(statePreChecks /* : Array<Object> */ = []) {
  // Note: yielding an array means all its values will be resolved before continuing
  const stateChecks = yield statePreChecks.map(function* checker(checkDef) {
    const prop = (yield effects.select(checkDef.select))[checkDef.getProp]();

    // Note: isPropValid should return a truthy/falsey value, given the prop
    return (typeof checkDef.isPropValid === 'function')
      ? checkDef.isPropValid(prop)
      : prop;
  });

  return stateChecks.every(check => !!check);
}

function* runSaga(
  action /* : Object */,
  doWork /* : function */,
  anonymousUser /* : boolean */,
  statePreChecks /* : Array<Object> */,
  onFail /* : function */
)/* : Generator<> */ {

  let jwt;
  const doLogout = action.type === types.authLogoutEvent;
  try {
    jwt = yield auth.getJwt(doLogout);
  } catch (err) {
    console.error('SAGA JWT:', err.message, action.type, anonymousUser); // eslint-disable-line no-console
  }

  // Note: if saga is not anonymous, and no jwt, then ignore/fail "silently"
  if (!doLogout && !anonymousUser && !jwt) return;

  const preChecksPassed = yield statePreChecksPassed(statePreChecks);
  if (!preChecksPassed) {
    yield effects.put(creators.utilRetryAction(action));
    return;
  }

  try {
    yield startTrackingAction(action);

    yield effects.call(doWork, action);

    yield stopActionTracker(action);
  } catch (err) {
    const errorAction = creators.actionTrackerError(
      action.type,
      action.actionTrackingField,
      err
    );
    yield effects.put(errorAction);

    const resultAction = onFail(err, action);
    if (typeof resultAction === 'object' && resultAction.type) yield effects.put(resultAction);
  }
}

function defaultOnFailHandler(error /* : Error */, action) {
  console.error('DEFAULT ON-FAIL HANDLER', error, action); // eslint-disable-line no-console
  return { actionType: action.type, type: 'defaultOnFailHandler' };
}

function sagaFactory(sagaDef/* : SagaDefType */)/* : function */ {
  const anonymousUser = (sagaDef.anonymousUser === true);
  const statePreChecks = Array.isArray(sagaDef.statePreChecks) ?
    sagaDef.statePreChecks : ([]);
  const onFail = typeof sagaDef.onFail === 'function' ?
    sagaDef.onFail : defaultOnFailHandler;

  const saga = function* saga()/* : Generator<> */ {
    // default redux-saga effect is takeEvery
    const sagaEffect = sagaDef.effect || effects.takeEvery;
    try {
      yield sagaEffect(
        sagaDef.actionType,
        function* tracker(action) {
          yield runSaga(
            action,
            sagaDef.work,
            anonymousUser,
            statePreChecks,
            onFail,
          );
        },
      );
    } catch (err) {
      console.error(`SAGA FACTORY ERROR: ${err}`); // eslint-disable-line no-console
    }
  };

  // add this actionType prop for testing purposes, to find the intended saga
  saga.actionType = sagaDef.actionType;

  return saga;
}

const sagas/* : Array<Generator<>> */ = sagaDefs
  .map(sagaFactory)
  .map(saga => saga());

export default function* rootSaga()/* : Generator<> */ {
  yield sagas;
}

export const testUtils/* : TestUtilsType */ = {
  reduceActionsForTypes(actions) {
    return actions.reduce((array, action) => {
      if (!action.type.startsWith('actionTracker')) {
        array.push(action.type);
      }
      return array;
    }, []);
  },
  sagaFactory,
};
