(() => {
  'use strict';

  const express = require('express');
  // eslint-disable-next-line new-cap
  const router = express.Router();

  router.use('/users', require('./user.routes'));

  module.exports = router;
})();
