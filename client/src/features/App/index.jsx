import { connect } from 'react-redux';

import App from './component';
import { profileWithState } from '../../reducers/rootReducer';


const mapStateToProps = state => ({
  state,
  profile: profileWithState(state).getProfile(),
});

const mapDispatchToProp = {
};

export default connect(mapStateToProps, mapDispatchToProp)(App);
