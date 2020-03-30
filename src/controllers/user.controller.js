(() => {

    'use strict';

    const HTTP_STATUS = require('http-status');
    const User = require('../models/user.model');
    const passport = require('passport');

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    const signUpWithEmailAndPassword = (req, res, next) => {

        if (!req.body.email) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                errors: {
                    email: 'is required'
                }
            });
        }

        if (!req.body.password) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                errors: {
                    password: 'is required'
                }
            });
        }

        const user = new User(req.body);
        user.setPassword(req.body.password);

        return user.save()
            .then(result => res.status(HTTP_STATUS.CREATED)
                .json({
                    success: true,
                    data: result.toAuthJSON()
                })
        ).catch(err => next(err));

    };

    const signInWithEmailAndPassword = (req, res, next) => {
        
        if (!req.body.email) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                errors: {
                    email: 'is required'
                }
            });
        }

        if (!req.body.password) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                errors: {
                    password: 'is required'
                }
            });
        }

        return passport.authenticate('local', { session: true }, (err, user, info) => {
            if (err) {
                return next(err);
            }

            if (user) {
                user.token = user.generateJWT();
                return res.status(HTTP_STATUS.OK).json({
                    success: true,
                    data: user.toAuthJSON()
                });
            }

            return status(HTTP_STATUS.BAD_REQUEST).info;

        })(req, res, next);

    };

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    const getLoggedInUser = (req, res, next) => {

        const { payload: { id } } = req;

        return User.findById(id)
            .then(user => {
                
                if (!user) {
                    return res.status(HTTP_STATUS.BAD_REQUEST).send();
                }

                return res.status(HTTP_STATUS.OK).json({
                    success: true,
                    data: user.toAuthJSON()
                });

            }).catch(err => next(err));

    };

    module.exports = {
        signUpWithEmailAndPassword,
        signInWithEmailAndPassword,
        getLoggedInUser
    };

})();