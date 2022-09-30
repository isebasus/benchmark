import React from 'react';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import agent from '../agent';
import Home from './home/Home';
import Status from './status/Status'; 
import { connect } from 'react-redux';
import { store, history } from '../store';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: server =>
    dispatch({ type: APP_LOAD, server}),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentDidUpdate(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(this.props.history.push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    const server = window.localStorage.getItem('server');
    if (server) {
      agent.setServer(server);
    }
    this.props.onLoad(server);
  }

  render() {
    if (this.props.appLoaded) {
      return(
        <Router history={history}>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/status/:server" element={<Status/>}/>
            </Routes>
        </Router> 
      );
    }
    return (
      <div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
