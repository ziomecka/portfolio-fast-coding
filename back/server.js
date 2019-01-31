require('mime');
require('./Redis/');

const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const constants = require('./constants');
const getSession = require('./server.session');

const serverCors = require('./server.cors');
const serverStatic = require('./server.static');

const router = require('./router');

const {
    PORT: _PORT,
    SESSION: { ROUTES }
} = constants;

const PROD_ENV = process.env.NODE_ENV;

const PORT = PROD_ENV
    ? process.env.PORT
    : _PORT;

app.use( helmet() );

app.set('trust proxy', 1);

/** Turn on hot module replacement. */
if ( !PROD_ENV && process.env.HMR ) {
    require('./server.hmr')();
}

app.use( serverStatic() );
app.use( serverCors() );
app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser() );
app.use( ROUTES, getSession() );
app.use ( '/', router );

server.listen(PORT, console.log(`Listening on ${ PORT }`));

