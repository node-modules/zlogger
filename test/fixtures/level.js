'use strict';

const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  time: false,
  level: process.argv[2],
});

logger.error('msg_error');
logger.warn('msg_warn');
logger.info('msg_info');
logger.log('msg_log');
logger.debug('msg_debug');
