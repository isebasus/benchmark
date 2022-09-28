import superagentPromise from 'superagent-promise'
import _superagent from 'superagent'

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = '' // TODO put api 
const responseBody = res => res.body;

let server = null;

const requests = {
    get: url => 
        superagent.get(`${API_ROOT}${url}`).then(responseBody),
    post: (url, body) => 
        superagent.post(`${API_ROOT}${url}`, body).then(responseBody)
};

const ServerStatus = {
    initializeServer: (server) =>
        requests.post('/v1/server', { server }),
    pingServer: () =>
        requests.get('/v1/server') 
};

export default {
    ServerStatus,
    setServer: _server => { server = _server; }
};