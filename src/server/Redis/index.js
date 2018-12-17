require('dotenv').config();
const redis = require('redis');
const url = require('url');

const {
    REDIS_KEYS: {
        EMAILS_KEY,
        LOGINS_KEY,
        USERS_KEY
    },
    REDIS_RESPONSES: {
        SUCCESS,
        ERROR,
        LOGIN_ALREADY_EXISTS,
        EMAIL_ALREADY_EXISTS,
    },
} = require('../constants');

class Redis {
    constructor(REDIS_URI) {
        const { port, hostname, auth } = url.parse(REDIS_URI);

        try {
            this.client = redis.createClient(port, hostname);
        } catch (err) {
            // TODO obsluzyc po stornie klienta
            console.warn(`Redis not available. ${err.message || err.toString()}`);
        }

        this.client.on('connect', () => console.log('Redis connected'));

        /** Will fire if authorization fails */
        this.client.on('error', err => {
           // TODO obsluzyc po stornie klienta
           console.warn(`Redis error: ${ err.message || err.toString() }`);
       });

       this.client.auth(auth.split(":")[1]);

       this.usersKey = USERS_KEY;
       this.loginsKey = LOGINS_KEY;
       this.emailsKey = EMAILS_KEY;
       this.remindPasswordKey = REMIND_PASSWORD_KEY;
    }

    generateKey (key, value) {
        return `${ key }_${ value }`;
    }

    generateUserKey (value) {
        return this.generateKey(this.usersKey, value);
    }

    }

    /**
     *
     * @param {object} options
     * @property {string} options.key
     */
    async keyExists(options) {
        return new Promise( ( res, rej ) => {
            this.client.exists( options.key, async (err, response) => {
                if (err) rej(err);
                res(response);
            } );
        });
    }


    /**
     *
     * @param {object} options
     * @property {string} options.key
     * @property {object} options.data
     * @property {number} options.expires - in seconds
     */
    async storeHash(options) {
        const { key, expires } = options;

        return new Promise( ( res, rej ) => {
            this.client.hmset(key, options.data, (err, response) => {
                if (err) rej(err);
                if (expires) this.client.expire(key, expires);
                res(response);
            });
        });
    }

    /**
     *
     * @param {object} options
     * @property {string} options.key
     * @property {string} options.value
     * @property {number} options.expires
     */
    async storeSet(options) {
        const { key, value, expires } = options;

        return new Promise(( res, rej ) => {
            this.client.sadd(key, value, (err, response) => {
                if (err) rej(err);
                if (expires) this.client.expire(key, expires);
                res(response);
            });
        });
    }

    /**
     *
     * @param {object} options
     * @property {string} options.key
     * @property {object} options.data
     * @property {string} options.data.salt
     * @property {string} options.data.hashPassword
     */
    async setNewUser(options) {
        let { key } = options;

        /** Store login in sets */
        const loginExists = await this.storeSet({ key: this.loginsKey, value: key });

        if ( loginExists === 0 ) {
            console.log('Login already exists.');
            return LOGIN_ALREADY_EXISTS;
        };

        try {
            /** Store email in sets */
            const emailExists = await this.storeSet({ key: this.emailsKey, value: options.data.email });

            if ( emailExists === 0 ) {
                console.log('Email already exists.');
                return EMAIL_ALREADY_EXISTS;
            }

            return await this.storePassword({ key, data: options.data }) //, callback: async (result) => {

        } catch (err) {
            console.log('Setting new user failed.');
            return ERROR;
        }
    }

    async storePassword(options) {
        let { key } = options;

        try {
            const passwordStored = await this.storeHash({ key: this.generateUserKey(key), data: options.data });

            if ( passwordStored === 'OK' ) {
                console.log('New user set');
                return SUCCESS;
            }

            console.log('Store password failed.');
            return ERROR;

        } catch (err) {
            console.log('Store password failed.');
            return ERROR;
        }
    }

    async getPassword(options) {
        let { key: _key, ...other } = options;
        const key = this.generateUserKey(_key);

        try {
            const keyExists = await this.keyExists({ key });

            if (!keyExists) {
                console.log('Login does not exist.');
                return LOGIN_DOES_NOT_EXIST;
            };

            return await this.getHash({ key, ...other });
        } catch (err) {
            console.log('Store password failed.');
            return ERROR;
        }
    }

    async getHash(options) {
        return new Promise ( ( res, rej ) => {
            this.client.hmget(options.key, ...options.data, (err, result) => {
                if (err) rej(err);

                res( result.reduce(( acc, cv, ind ) => {
                    acc[options.data[ind]] = cv;
                    return acc;
                }, {}));
            });
        });
    }
};

const _redis = new Redis(process.env.REDIS_URI);

module.exports = _redis;