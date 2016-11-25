'use strict';

const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  time: false,
});
logger.info('start');

const child1 = logger.child('└');
child1.info('child1');

const child2 = child1.child('─');
child2.info('child2');

const child3 = child2.child('─');
child3.info('child3');

const child4 = child3.child('─');
child4.info('child4');
