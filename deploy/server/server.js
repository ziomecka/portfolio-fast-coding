require('mime');
require('./Redis/');

const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.Server(app);
const cookieParser = require('cookie-parser');

const constants = require('./constants');

const serverCors = require('./server.cors');
const serverNewUserSet = require('./server.newuser.set');
const serverLoginLog = require('./server.login.log');
const serverLessonsGet = require('./server.lessons.get');
const serverChangePassword = require('./server.change.password');
const serverRemindPassword = require('./server.remind.password');
const serverNewPassword = require('./server.new.password');

const { PORT: _PORT, ROUTES: { LESSONS_GET, NEW_USER_SET, LOGIN_LOG, CHANGE_PASSWORD, REMIND_PASSWORD, NEW_PASSWORD } } = constants;

const PROD_ENV = process && process.env.NODE_ENV? process.env.NODE_ENV.trim() === 'production' : false;

const PORT = !PROD_ENV ? _PORT : process.env.PORT;

const ROOT = path.resolve(__dirname, '../');

const HTML_PATH = !PROD_ENV
    ? path.resolve(ROOT, '/')
    : path.resolve(ROOT, '../../../index.html');

/** Turn on hot module replacement. */
if (!PROD_ENV) {
    const webpack = require('webpack');
    const webpackPath = path.resolve(ROOT, '../webpack/webpack.bundle');
    const webpackConfig = require(webpackPath);
    const compiler = webpack(webpackConfig);

    app.use(
        require('webpack-dev-middleware')(compiler, {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
        })
    );

    app.use(require('webpack-hot-middleware')(compiler));
}

if (!PROD_ENV) {
    app.use( serverCors() );
}

app.get('*.js', (req, res, next) => {
    req.url = req.url + '.gz';
    res.set('Content-Encoding', 'gzip');
    res.set('Content-Type', 'text/javascript');
    next();
});

app.use(express.static(ROOT, {
    setHeaders: (res, path) => {
        res.set('Access-Control-Allow-Headers', 'cache-control');

        if (RegExp(/(.*npm\..*)|(.*vendor.*)/).test(path)) {
            res.set("Cache-Control", "public, max-age=31536000");
        } else {
            res.set("Cache-Control", "public, max-age=0");
        }
}}));

app.use( express.json() );
app.use( express.urlencoded({ extended: false }) );
app.use( cookieParser() );

/** Get lessons */
app.get( LESSONS_GET, serverLessonsGet );

/** Set newuser */
app.post( NEW_USER_SET, serverNewUserSet );

/** Log user */
app.post( LOGIN_LOG, serverLoginLog );

/** Change password */
app.post( CHANGE_PASSWORD, serverChangePassword );

/** Remind password */
app.post( REMIND_PASSWORD, serverRemindPassword );

/** New password */
app.post( `${ NEW_PASSWORD }/set`, serverNewPassword );

app.get('*', (req, res) => res.sendFile(HTML_PATH, { root: ROOT }));

server.listen(PORT, console.log(`Listening on ${ PORT }`));