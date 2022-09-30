import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'http://localhost:8080'
const responseBody = response => response.text();

let server = null;

const requests = {
    post: (url, body) =>
        fetch(`${API_ROOT}${url}`, {
            method: "POST",
            headers: new Headers({'content-type': 'application/json'}),
            body: JSON.stringify(body)
        }).then(responseBody)
};

const ServerStatus = {
    initializeServer: (server) =>
        requests.post('/v1/server', server)
};

export default {
    ServerStatus,
    setServer: _server => { server = _server; }
};