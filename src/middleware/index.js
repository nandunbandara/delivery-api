(() => {

    'use strict';

    const cors = require('cors');
    const bodyParser = require('body-parser');
    const mongoose = require('mongoose');
    const session = require('express-session');

    const isProduction = process.env.NODE_ENV === 'production';

    mongoose.promise = global.Promise;

    // models
    require('../models/user.model');
    require('../util/passport');

    const init = app => {

        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(session({
            secret: 'core-delivery',
            cookie: { maxAge: 60000 },
            resave: false,
            saveUninitialized: false
        }));

        if (!isProduction) {
            app.use(require('morgan')('dev'));
            mongoose.set('debug', true);
        }

        app.use((err, req, res, next) => {
            
            res.status(err.status || 500);

            res.json({
                errors: {
                    message: err.message,
                    error: {},
                },
            });

        });

    };

    module.exports = {
        init
    };

})();