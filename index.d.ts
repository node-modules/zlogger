import { WriteStream } from 'fs';
import { ChildProcess } from 'child_process';
import { Console } from 'console';

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

  private stdout:WriteStream;

  private stderr:WriteStream;

  private level:LogLevel;

  child(prefix: string): ConsoleLogger;

  child(child: ChildProcess | WriteStream, prefix: string): ConsoleLogger;

  end(): void;
}

export = ConsoleLogger;
