'use strict';

const ChildProcess = require('child_process').ChildProcess;
const Console = require('console').Console;
const through = require('through2');
const split = require('split2');
const pumpify = require('pumpify');

const levels = {
  DEBUG: 0,
  INFO: 1,
  LOG: 1,
  WARN: 2,
  ERROR: 3,
  NONE: Infinity,
  ALL: -Infinity,
};

const defaults = {
  stdout: process.stdout,
  stderr: process.stderr,
  prefix: '',
  time: true,
  level: levels.ALL,
};

/**
 * log/debug/info -> this.stdout(pad) -> opt.stdout
 * warn/error -> this.stderr(pad) -> opt.stderr
 */
class Logger extends Console {

  constructor(options) {
    options = Object.assign({}, defaults, options);
    const stdout = padStream(() => this._getPrefix());
    const stderr = padStream(() => this._getPrefix());
    super(stdout, stderr);

    this.stdout = stdout;
    this.stderr = stderr;
    this.options = options;

    if (options.level !== undefined) this.level = options.level;

    stdout.setMaxListeners(100);
    stderr.setMaxListeners(100);
    stdout.pipe(options.stdout);
    stderr.pipe(options.stderr);
  }

  child(obj, prefix) {
    // child('> ')
    if (typeof obj === 'string') {
      prefix = obj;
      obj = null;
    }

    // obj -> child.stdout/stderr(pad) -> this.stdout/stderr(pad) -> opt.stdout
    const child = new Logger({
      stdout: this.stdout,
      stderr: this.stderr,
      time: false,
      prefix: prefix || '',
      level: this.options.level,
    });

    if (obj) {
      if (obj instanceof ChildProcess) {
        obj.stdout.pipe(child.stdout, { end: false });
        obj.stderr.pipe(child.stderr, { end: false });
      } else if (obj.pipe) {
        obj.pipe(child.stdout, { end: false });
      }
    }

    return child;
  }

  end() {
    this.stdout.end();
    this.stderr.end();
  }

  _getPrefix() {
    let prefix = this.options.prefix;
    if (typeof prefix === 'function') prefix = prefix();
    if (!this.options.time) return prefix;

    const d = new Date();
    let hours = d.getHours();
    let mintues = d.getMinutes();
    let seconds = d.getSeconds();

    /* istanbul ignore next */
    if (hours < 10) hours = '0' + hours;
    /* istanbul ignore next */
    if (mintues < 10) mintues = '0' + mintues;
    /* istanbul ignore next */
    if (seconds < 10) seconds = '0' + seconds;

    return `[${hours}:${mintues}:${seconds}] ${prefix}`;
  }

  set level(level) {
    this.options.level = normalizeLevel(level);
  }

  get level() {
    return this.options.level;
  }

  /**
   * should output log or not
   * @param {String} level log level, must in upper case
   * @return {Boolean} should or not
   */
  _shouldLog(level) {
    if (this.options.level === levels.NONE) return false;

    return this.options.level <= levels[level];
  }

  error(...args) {
    if (this._shouldLog('ERROR')) return super.error(...args);
  }

  warn(...args) {
    if (this._shouldLog('WARN')) return super.warn(...args);
  }

  info(...args) {
    if (this._shouldLog('INFO')) return super.info(...args);
  }

  log(...args) {
    return this.info(...args);
  }

  debug(...args) {
    if (this._shouldLog('DEBUG')) return super.debug(...args);
  }
}

module.exports = Logger;

function padStream(prefix) {
  return pumpify(split(), through(function(data, enc, cb) {
    this.push(prefix());
    this.push(data);
    this.push('\n');
    cb();
  }));
}

function normalizeLevel(level) {
  if (typeof level === 'number') return level;

  // 'WARN' => level.warn
  /* istanbul ignore else */
  if (typeof level === 'string' && level) {
    return levels[level.toUpperCase()];
  }
}
