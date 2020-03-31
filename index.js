(() => {
  'use strict';

  const express = require('express');
  const logger = require('./src/util/logger');
  const middleware = require('./src/middleware');
  const database = require('./src/util/database');
  const router = require('./src/routes');

  const app = express();
  middleware.init(app);
  app.use(router);

  const PORT = process.env.PORT || 3200;

  database.connect()
      .then(() => logger
          .info(`Connected to the database on ${process.env.DB_HOST}`))
      .catch((err) => logger.error(err.message));

  app.listen(PORT, () => logger.info(`Started application on port ${PORT}`));
})();
