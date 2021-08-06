const express = require('express');
const dsRoutes = require('./dataSource.route');

const router = express.Router();

const routes = [
  {
    path: '/data-sources',
    route: dsRoutes
  }
];

routes.forEach(route => {
  router.use(route.path, route.route);
});

module.exports = router;