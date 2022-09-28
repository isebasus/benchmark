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
        this.changeProtocolVersion = updateFieldEvent('protocolVersion');

        this.submitServer = ev => {
            ev.preventDefault();
            const server = {
                hostname: this.props.hostname,
                port: this.props.port,
                protocolVersion: this.props.protocolVersion
            };

            const payload = agent.ServerStatus.initializeServer(server);
            this.props.onSubmit(payload);
        }
    }

    componentWillMount() {
        this.props.onLoad()
    }

    componentWillUnmount() {
        this.props.onUnload();
    }

    // TODO make some magic here
    render() {
        console.log("here at home")
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
                      type="text"
                      placeholder="port"
                      value={this.props.port}
                      onChange={this.changePort} />
                  </fieldset>

                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows="8"
                      placeholder="protocol version: 760"
                      value={this.props.protocolVersion}
                      onChange={this.changeProtocolVersion}>
                    </textarea>
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