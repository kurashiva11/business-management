'use strict';
var userHandlers = require('../controllers/UserController');

module.exports = function(router) {
    router.post('/auth/register', userHandlers.register);
    router.post('/auth/sign_in', userHandlers.sign_in);
};