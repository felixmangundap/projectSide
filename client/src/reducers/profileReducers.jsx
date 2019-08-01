import types from '../actions/actions';

export const initialState = {
  profile: {
    name: 'FFM',
  },
  users: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.usersFetch.success: {
      const { users } = action.data;
      return {
        users,
      };
    }
    default:
      return state;
  }
};

export const withState = state => ({
  getProfile: () => state.users,
});
