'use strict';
var userHandlers = require('../controllers/UserController');

module.exports = function(router) {
    var businessHandlers = require('../controllers/BusinessController');
    router.get('/business', businessHandlers.GetBusinessData);
    router.post('/business', userHandlers.loginRequired, businessHandlers.PostBusinessData);
};