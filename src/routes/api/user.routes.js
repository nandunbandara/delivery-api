(() => {

    'use strict';

    const router = require('express').Router();
    const UserController = require('../../controllers/user.controller');
    const auth = require('../auth');

    router.post('/', auth.optional, UserController.signUpWithEmailAndPassword);
    router.post('/signIn', auth.optional, UserController.signInWithEmailAndPassword);
    router.get('/loggedIn', auth.required, UserController.getLoggedInUser);

    module.exports = router;

})();