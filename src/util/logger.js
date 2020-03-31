/**
 *  Winston logging
 * Author: Nandun Bandara
 */

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: {service: 'core-api'},
  transports: [
    new (winston.transports.Console)({
      timestamp: true,
      colorize: true,
    }),
  ],
});

module.exports = logger;

