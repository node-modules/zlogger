'use strict';

const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix > ',
  time: false,
});
logger.log('log');
logger.info('info');
logger.warn('warn');
logger.error('error');
