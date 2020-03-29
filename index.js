(() => {

    'use strict';

    const express = require('express');
    const logger = require('./src/util/logger');
    const app = express();

    const PORT = process.env.PORT || 3200;
   
    app.listen(PORT, () => logger.info(`Started application on port ${PORT}`));

})();