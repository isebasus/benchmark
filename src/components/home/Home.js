import React from 'react';
import agent from 'react-redux'
import { connect } from 'superagent';

import {
    HOME_PAGE_LOADED,
    HOME_PAGE_UNLOADED,
    SERVER_SUBMISSION
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
        dispatch({ type: SERVER_SUBMISSION, payload})
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
        return (
            <div></div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);