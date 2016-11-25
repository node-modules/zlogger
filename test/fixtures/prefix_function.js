'use strict';

const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix() {
    return Date.now() + ' ';
  },
});
logger.info('info');
logger.error('error');
