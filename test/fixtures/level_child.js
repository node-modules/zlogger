'use strict';

const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  time: false,
  level: process.argv[2],
});

const child = logger.child('child:');

logger.error('msg_error');

child.error(`msg_child_error_${child.level}`);
child.info('msg_child_info');
