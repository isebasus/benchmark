import React from "react";
import agent from '../../agent';
import { connect } from 'react-redux';

import {
    STATUS_PAGE_RELOAD,
    STATUS_PAGE_LOADED,
    PING_SERVER,
    CHANGE_SERVER
} from '../../constants/actionTypes';

const promise = global.promise;

const mapStateToProps = state => ({
    ...state.status
});

const mapDispatchToProps = dispatch => ({
    onLoad: server => 
        dispatch({ type: STATUS_PAGE_LOADED, server }),
    onReload: () =>
        dispatch({ type: STATUS_PAGE_RELOAD}),
    onPing: server =>
        dispatch({ type: PING_SERVER, server}),
    changeServer: () =>
        dispatch({ type: CHANGE_SERVER })
})

class Status extends React.Component {
    constructor() { 
    }

    componentWillMount() {
        const server = window.localStorage.getItem('server');
        if (server) {
            agent.setServer(server)
        }
        this.props.onLoad(server);
    }

    componentWillUnmount() {
        this.props.onReload();
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Status);