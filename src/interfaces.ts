export interface ConfigInfo {
  autostart: boolean;
  command: string;
  exitcodes: number[];
  group: string;
  group_prio: number;
  inuse: boolean;
  killasgroup: boolean;
  name: string;
  process_prio: number;
  redirect_stderr: boolean;
  startretries: number;
  startsecs: number;
  stdout_capture_maxbytes: number;
  stdout_events_enabled: boolean;
  stdout_logfile: string;
  stdout_logfile_backups: number;
  stdout_logfile_maxbytes: number;
  stdout_syslog: boolean;
  stopsignal: number;
  stopwaitsecs: number;
  stderr_capture_maxbytes: number;
  stderr_events_enabled: boolean;
  stderr_logfile: string;
  stderr_logfile_backups: number;
  stderr_logfile_maxbytes: number;
  stderr_syslog: boolean;
}

export interface ProcessInfo {
  name: string;
  group: string;
  start: number;
  stop: number;
  now: number;
  state: number;
  statename: string;
  spawnerr: string;
  exitstatus: number;
  logfile: string;
  stdout_logfile: string;
  stderr_logfile: string;
  pid: number;
  description: string;
}

export interface State {
  state: number;
  statename: string;
}

export interface ProcessStatusInfo {
  name: string;
  group: string;
  status: number;
  description: string;
}

export interface MulticallArgs {
  methodName: string;
  params: any[];
}

export interface MulticallResult {
  faultCode: number;
  faultString: string;
}
