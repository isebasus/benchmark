import logo from './logo.svg';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import { APP_LOAD, REDIRECT } from '../../constants/actionTypes';
import React from 'react';

const mapStateToProps = state => {
  return {
    appLoaded: state.common.appLoaded,
    appName: state.common.appName,
    redirectTo: state.common.redirectTo
  }
};

const mapDispatchToProps = dispatch => ({
  onLoad: (payload, token) =>
    dispatch({ type: APP_LOAD, payload, token, skipTracking: true}),
  onRedirect: () =>
    dispatch({ type: REDIRECT })
});

class App extends React.Component {
  componentWillReceiveProps(nextProps) {
    if (nextProps.redirectTo) {
      store.dispatch(push(nextProps.redirectTo));
      this.props.onRedirect();
    }
  }

  componentDidMount() {
    // TODO determine if needed
  }

  render() {
    if (this.props.appLoaded) {
      return(
        <div>
          <Header
            appName={this.props.appName}
            currentUser={this.props.currentUser}
          />
          <Switch>
            <Route exact path="/" component={Home}/>
          </Switch>
        </div>
      )
    }
  }

}

export default App;
