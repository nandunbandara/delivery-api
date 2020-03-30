(() => {

    'use strict';

    const jwt = require('express-jwt');

    const getTokensFromHeaders = req => {
        const { headers: { authorization } } = req;

        if (authorization && authorization.split(' ')[0] === 'Token') {
            return authorization.split(' ')[1];
        }

        return null;
    };

    const auth = {
        required: jwt({
            secret: '1qaz2wsx@',
            userProperty: 'payload',
            getToken: getTokensFromHeaders
        }),
        optional: jwt({
            secret: '1qaz2wsx@',
            userProperty: 'payload',
            getToken: getTokensFromHeaders,
            credentialsRequired: false
        })
    };


    module.exports = auth;

})();