import React from 'react';
import agent from '../../agent'
import { connect } from 'react-redux';

import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    SERVER_SUBMITTED,
    UPDATE_FIELD_EVENT
} from '../../constants/actionTypes';

const promise = global.Promise;

const mapStateToProps = state => ({
    ...state.home,
    appName: state.common.appName,
    token: state.common.token
});

const mapDispatchToProps = dispatch => ({
    onLoad: () => 
        dispatch({ type: HOME_PAGE_LOADED}),
    onUnload: () =>
        dispatch({ type: HOME_PAGE_UNLOADED}),
    onSubmit: payload =>
        dispatch({ type: SERVER_SUBMITTED, payload}),
    onUpdateField: (key, value) =>
        dispatch({ type: UPDATE_FIELD_EVENT, key, value })
});

class Home extends React.Component {
    constructor() {
        super();

        const updateFieldEvent =
            key => event => this.props.onUpdateField(key, event.target.value);

        this.changeHostname = updateFieldEvent('hostname');
        this.changePort = updateFieldEvent('port');

        this.submitServer = ev => {
            ev.preventDefault();
            const server = {
                hostname: this.props.hostname,
                port: parseInt(this.props.port)
            };

            const payload = agent.ServerStatus.initializeServer(server);
            this.props.onSubmit(payload);
        }
    }

    componentDidMount() {
        this.props.onLoad()
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    // TODO make some magic here
    render() {
        return (
            <div>
                <form>
                <fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="hostname"
                      value={this.props.hostname}
                      onChange={this.changeHostname} />
                  </fieldset>

                  <fieldset className="form-group">
                    <input
                      className="form-control"
                      type="number"
                      value={this.props.port}
                      onChange={this.changePort} />
                  </fieldset>

                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    disabled={this.props.inProgress}
                    onClick={this.submitServer}>
                    Benchmark Server
                  </button>

                </fieldset>
              </form>
            </div>
        
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);