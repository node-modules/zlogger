import { WriteStream } from 'fs';
import { ChildProcess } from 'child_process';
import { Writable } from 'stream';

type LogLevel =
  | 'DEBUG'
  | 'INFO'
  | 'LOG'
  | 'WARN'
  | 'ERROR'
  | 'NONE'
  | 'ALL'
  | number;

interface ConsoleLoggerOpt {
  stdout?: WriteStream;
  stderr?: WriteStream;
  prefix?: string;
  time?: boolean;
  level?: LogLevel;
}

declare class ConsoleLogger extends Console {
  constructor(opt?: ConsoleLoggerOpt);

  child(prefix: string): ConsoleLogger;

  child(child: ChildProcess | Writable, prefix: string): ConsoleLogger;

  end(): void;
}

export = ConsoleLogger;
