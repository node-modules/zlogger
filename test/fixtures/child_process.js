'use strict';

const cp = require('child_process');
const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix > ',
});
logger.log('start');

const ls = cp.spawn('ls', { cwd: __dirname });
logger.child(ls, '> ');
