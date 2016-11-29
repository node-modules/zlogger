'use strict';

const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix > ',
});
logger.log('start');

const child = logger.child(Date, '> ');
child.info('child');
