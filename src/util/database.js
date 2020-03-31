(() => {
  'use strict';

  const mongoose = require('mongoose');

  const username = process.env.DB_USERNAME;
  const password = process.env.DB_PASSWORD;
  const host = process.env.DB_HOST;
  const database = process.env.DB_DATABASE;

  const connect =
        () => mongoose.connect(`mongodb+srv://${username}:${password}@${host}/${database}`);

  module.exports = {
    connect,
  };
})();
