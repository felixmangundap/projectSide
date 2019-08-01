import React, { Component } from 'react';
import PropTypes from 'prop-types';

import logo from '../../assets/logo.svg';
import './style.css';

class App extends Component {
  state = {
    apiResponse: '',
  }

  componentDidMount() {
    this.callAPI();
  }

  callAPI = () => {
    fetch('http://localhost:9000/testAPI')
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  render() {
    const { profile: { name } } = this.props;
    const { apiResponse } = this.state;

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>{ apiResponse }</p>
          <p>{`Hello ${name}`}</p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

App.propTypes = {
  profile: PropTypes.object,
};

App.defaultProps = {
  profile: {},
};

export default App;
