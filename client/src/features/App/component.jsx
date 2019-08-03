import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';
import './style.css';

class App extends Component {
  state = {}

  componentDidMount() {
    const { fetchUser } = this.props;
    fetchUser({ id: '5d44d997299007196a617770' });
  }

  render() {
    const { profile } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{ `Hello, I'm ${profile.name}` }</p>
        </header>
      </div>
    );
  }
}

App.propTypes = {
  fetchUser: PropTypes.func.isRequired,
  profile: PropTypes.object,
};

App.defaultProps = {
  profile: {},
};

export default App;
