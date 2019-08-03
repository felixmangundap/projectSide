import { connect } from 'react-redux';

import App from './component';
import types from '../../actions/actions';
import { profileWithState } from '../../reducers/reducers';


const mapStateToProps = state => ({
  state,
  profile: profileWithState(state).getProfile(),
});

const mapDispatchToProp = {
  fetchUser: types.userFetch.request,
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
