'use strict';

const fs = require('fs');
const path = require('path');
const coffee = require('coffee');
const assert = require('power-assert');


const fixtures = path.join(__dirname, 'fixtures');

describe('test/index.test.js', () => {

  it('should add prefix', () => {
    return coffee.fork(path.join(fixtures, 'console_logger.js'))
    .debug()
    .expect('stdout', /\[\d{2}:\d{2}:\d{2}\] prefix > log\n/)
    .expect('stdout', /\n\[\d{2}:\d{2}:\d{2}\] prefix > info\n/)
    .expect('stderr', /\[\d{2}:\d{2}:\d{2}\] prefix > warn\n/)
    .expect('stderr', /\n\[\d{2}:\d{2}:\d{2}\] prefix > error\n/)
    .expect('code', 0)
    .end();
  });

  it('should log without time', () => {
    return coffee.fork(path.join(fixtures, 'time_false.js'))
    .debug()
    .expect('stdout', /prefix > log\n/)
    .expect('stdout', /\nprefix > info\n/)
    .expect('stderr', /prefix > warn\n/)
    .expect('stderr', /\nprefix > error\n/)
    .expect('code', 0)
    .end();
  });

  it('should pass stdout/stderr', function* () {
    yield coffee.fork(path.join(fixtures, 'stdout_stderr.js'))
    .debug()
    .expect('code', 0)
    .end();

    const stdout = fs.readFileSync(path.join(__dirname, 'fixtures/stdout.log'), 'utf8');
    const stderr = fs.readFileSync(path.join(__dirname, 'fixtures/stderr.log'), 'utf8');
    assert(/\[\d{2}:\d{2}:\d{2}\] prefix > log\n/.test(stdout));
    assert(/\n\[\d{2}:\d{2}:\d{2}\] prefix > info\n/.test(stdout));
    assert(/\[\d{2}:\d{2}:\d{2}\] prefix > warn\n/.test(stderr));
    assert(/\n\[\d{2}:\d{2}:\d{2}\] prefix > error\n/.test(stderr));
  });

  it('should write by child_process', () => {
    return coffee.fork(path.join(fixtures, 'child_process.js'))
    .debug()
    .expect('stdout', /prefix > > child_process.js/)
    .expect('code', 0)
    .end();
  });

  it('should write by stream', () => {
    return coffee.fork(path.join(fixtures, 'child_stream.js'))
    .debug()
    .expect('stdout', /prefix > > a/)
    .expect('stdout', /prefix > > b/)
    .expect('code', 0)
    .end();
  });

  it('should write by child logger', () => {
    return coffee.fork(path.join(fixtures, 'mix_console.js'))
    .debug()
    .expect('stdout', /prefix> no prefix/)
    .expect('stdout', /prefix> 1> start/)
    .expect('stdout', /2> child logger info/)
    .expect('stderr', /2> child logger error/)
    .expect('stdout', /1> may be done/)
    .expect('code', 0)
    .end();
  });

  it('should write by cascade logger', () => {
    return coffee.fork(path.join(fixtures, 'cascade_console.js'))
    .debug()
    .expect('code', 0)
    .end();
  });

  it('should get child when obj is unknown', () => {
    return coffee.fork(path.join(fixtures, 'unknown_obj.js'))
    .expect('stdout', /prefix > > child/)
    .debug()
    .expect('code', 0)
    .end();
  });

  it('should write when prefix is function', () => {
    return coffee.fork(path.join(fixtures, 'prefix_function.js'))
    .expect('stdout', /\d{13} info/)
    .expect('stderr', /\d{13} error/)
    .debug()
    .expect('code', 0)
    .end();
  });
});
