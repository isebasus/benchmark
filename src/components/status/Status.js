import React from "react";
import agent from '../../agent';
import { connect } from 'react-redux';

import {
    STATUS_PAGE_LOADED,
    PING_SERVER,
    CHANGE_SERVER,
    STATUS_PAGE_UNLOADED
} from '../../constants/actionTypes';

const promise = global.promise;

const mapStateToProps = state => ({
    ...state.status
});

const mapDispatchToProps = dispatch => ({
    onLoad: (server, host, port) => 
        dispatch({ type: STATUS_PAGE_LOADED, server, host, port}),
    onUnload: () =>
        dispatch({ type: STATUS_PAGE_UNLOADED}),
    onPing: payload =>
        dispatch({ type: PING_SERVER, payload}),
    changeServer: () =>
        dispatch({ type: CHANGE_SERVER })
})

class Status extends React.Component {
    constructor() {
        super();
    }

    componentDidMount() {
        const data = window.localStorage.getItem('server');
        if (data) {
            agent.setServer(data)
        }
        var server = JSON.parse(data);
        this.props.onLoad(data, server.hostname, server.port);

        this.interval = setInterval(() => {
            if (this.props.statusLoaded) {
                if (this.props.hostname != null && this.props.port != null 
                    && this.props.inProgress == false) {
                    const server = {
                        hostname: this.props.hostname,
                        port: this.props.port
                    };
                
                    const payload = agent.ServerStatus.pingServer(server);
                    this.props.onPing(payload);
                } else {
                    console.log("Client: Server not initalized");
                }
            }
        }, 2000);
    }

    componentWillUnmount() {
        this.props.onUnload();
        clearInterval(this.interval);
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);