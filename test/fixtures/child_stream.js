'use strict';

const through2 = require('through2');
const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix > ',
});
logger.log('start');

const stream = through2();
logger.child(stream, '> ');
stream.write('a\n');
stream.write('b\n');
stream.end();
