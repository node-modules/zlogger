import { WriteStream } from 'fs';
import { ChildProcess } from 'child_process';

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

declare class ConsoleLogger {
  constructor(opt?: ConsoleLoggerOpt);

  error(message?: any, ...optionalParams: any[]): void;

  warn(message?: any, ...optionalParams: any[]): void;

  info(message?: any, ...optionalParams: any[]): void;

  log(message?: any, ...optionalParams: any[]): void;

  debug(message?: any, ...optionalParams: any[]): void;

  child(prefix: string): ConsoleLogger;

  child(child: ChildProcess, prefix: string): ConsoleLogger;

  child(child: any, prefix: string): ConsoleLogger;

  end(): void;
}

export = ConsoleLogger;
