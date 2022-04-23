const routes = {};

routes.user = require('../routes/users/users-router');
routes.quotes = require('../routes/quotes/quotes-router');

module.exports = routes;