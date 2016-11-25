'use strict';

const fs = require('fs');
const path = require('path');
const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix > ',
  stdout: fs.createWriteStream(path.join(__dirname, 'stdout.log')),
  stderr: fs.createWriteStream(path.join(__dirname, 'stderr.log')),
});
logger.log('log');
logger.info('info');
logger.warn('warn');
logger.error('error');

logger.end();
