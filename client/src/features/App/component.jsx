import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';
import './style.css';

class App extends Component {
  state = {
    apiResponse: '',
  }

  componentDidMount() {
  }

  renderProfiles = () => {
    const { profile: profiles } = this.props;
    return profiles.map(profile => (
      <div key={profile._id}>
        <p>{profile.name}</p>
        <p>{profile.email}</p>
      </div>
    ));
  }

  render() {
    const { fetchUsers } = this.props;
    const { apiResponse } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{ apiResponse }</p>
          {this.renderProfiles()}
          <button type="button" onClick={fetchUsers}>Fetch Users</button>
        </header>
      </div>
    );
  }
}

App.propTypes = {
  fetchUsers: PropTypes.func.isRequired,
  profile: PropTypes.array,
};

App.defaultProps = {
  profile: [],
};

export default App;
