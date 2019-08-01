import types from '../actions/actions';

export const initialState = {
  profile: {
    name: 'FFM',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.userFetch.success:
      return {
        profile: {
          name: 'Felix',
        },
      };
    default:
      return state;
  }
};

export const withState = state => ({
  getProfile: () => state.profile,
});
