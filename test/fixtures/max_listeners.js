'use strict';

const through2 = require('through2');
const ConsoleLogger = require('../..');

const logger = new ConsoleLogger({
  prefix: 'prefix > ',
});

for (let i = 0; i < 15; i++) {
  createChild(i);
}

function createChild(i) {
  const stream = through2();
  logger.child(stream, i + '> ');
  stream.write('a\n');
  stream.end();
}
