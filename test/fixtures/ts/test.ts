import ConsoleLogger = require('../../../.');
import * as child_process from 'child_process';
import * as fs from 'fs';

let logger = new ConsoleLogger({
  stdout: fs.createWriteStream('stdout.log'),
  stderr: fs.createWriteStream('stderr.log'),
  prefix: '> ',
  level: 'WARN',
  time: false,
});

logger.level = 'WARN';
logger.level =10;
logger.stdout = fs.createWriteStream('stdout.log');
logger.stderr = fs.createWriteStream('stdout.log');

logger.debug('debug', 'debug');
logger.log('log', 'log');
logger.info('info', 'info');
logger.warn('warn', 'warn');
logger.error('error', 'error');

let child = logger.child('child> ');
const ls = child_process.spawn('ls', { cwd: __dirname });
child = logger.child(ls, 'child> ');
child.debug('debug', 'debug');
child.log('log', 'log');
child.info('info', 'info');
child.warn('warn', 'warn');
child.error('error', 'error');

logger = new ConsoleLogger();

logger.end();
