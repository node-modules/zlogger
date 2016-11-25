'use strict';

const cp = require('child_process');
const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix> ',
});
logger.log('start');

// child_process
const ls = cp.spawn('ls', { cwd: __dirname });
const cpLogger = logger.child(ls, '1> ');
cpLogger.info('start');
setTimeout(() => cpLogger.info('may be done'), 100);

// child logger
const childLogger = logger.child('2> ');
childLogger.info('child logger info');
childLogger.error('child logger error');

// child no prefix
const noprefixChildLogger = logger.child();
noprefixChildLogger.info('no prefix');
