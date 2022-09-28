import React from 'react';
import { APP_LOAD, REDIRECT } from '../constants/actionTypes';
import { Route, Routes, BrowserRouter } from 'react-router-dom';

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
    console.log(this.props.appLoaded)
    if (this.props.appLoaded) {
      return(
        <BrowserRouter history={history}>
          <div>
            <Routes>
              <Route path="/" component={Home}/>
              <Route path="/status/:server" component={Status}/>
            </Routes>
          </div>
        </BrowserRouter> 
      );
    }
    return (
      <div>
      </div>
    )
  }

}

export default connect(mapStateToProps, mapDispatchToProps)(App);
