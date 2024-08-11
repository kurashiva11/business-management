'use strict';

module.exports = function(app) {
    var userRoutes = require('./userRoute');
    var businessRoutes = require('./businessRoute');
    userRoutes(app);
    businessRoutes(app);
}