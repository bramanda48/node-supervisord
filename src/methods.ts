import { ConfigInfo, MulticallArgs, ProcessInfo, ProcessStatusInfo, State } from "./interfaces";

export const $SupervisorMethod = [
  "supervisor.addProcessGroup",
  "supervisor.clearAllProcessLogs",
  "supervisor.clearLog",
  "supervisor.clearProcessLog",
  "supervisor.clearProcessLogs",
  "supervisor.getAPIVersion",
  "supervisor.getAllConfigInfo",
  "supervisor.getAllProcessInfo",
  "supervisor.getIdentification",
  "supervisor.getPID",
  "supervisor.getProcessInfo",
  "supervisor.getState",
  "supervisor.getSupervisorVersion",
  "supervisor.getVersion", // deprecated
  "supervisor.readLog",
  "supervisor.readMainLog", // deprecated
  "supervisor.readProcessLog", // deprecated
  "supervisor.readProcessStderrLog",
  "supervisor.readProcessStdoutLog",
  "supervisor.reloadConfig",
  "supervisor.removeProcessGroup",
  "supervisor.restart",
  "supervisor.sendProcessStdin",
  "supervisor.sendRemoteCommEvent",
  "supervisor.signalProcess",
  "supervisor.signalProcessGroup",
  "supervisor.shutdown",
  "supervisor.startAllProcesses",
  "supervisor.startProcess",
  "supervisor.startProcessGroup",
  "supervisor.stopAllProcesses",
  "supervisor.stopProcess",
  "supervisor.stopProcessGroup",
  "supervisor.tailProcessLog", // deprecated
  "supervisor.tailProcessStderrLog",
  "supervisor.tailProcessStdoutLog",
  "system.listMethods",
  "system.methodHelp",
  "system.methodSignature",
  "system.multicall",
];

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class SupervisordClientMethod {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface SupervisordClientMethod {
  /**
   * Return the version of the RPC API used by supervisord
   *
   * @return {string}
   */
  getAPIVersion: () => Promise<string>;

  /**
   * @deprecated
   * Return the version of the RPC API used by supervisord
   *
   * @return {string}
   */
  getVersion: () => Promise<string>;

  /**
   * Return the version of the supervisor package in use by supervisord
   *
   * @return {string} version id
   */
  getSupervisorVersion: () => Promise<string>;

  /**
   * Return identifying string of supervisord
   *
   * @return {string} identifying string
   */
  getIdentification: () => Promise<string>;

  /**
   * Return current state of supervisord as a struct
   *
   * @return {State} A struct with keys int statecode, string statename
   */
  getState: () => Promise<State>;

  /**
   * Return the PID of supervisord
   *
   * @return {number} PID
   */
  getPID: () => Promise<number>;

  /**
   * Read length bytes from the main log starting at offset
   *
   * @param {number} offset offset to start reading from
   * @param {number} length number of bytes to read from the log
   * @return {string} Bytes of log
   */
  readLog: (offset: number, length: number) => Promise<string>;

  /**
   * Clear the main log
   *
   * @return {boolean} always returns True unless error
   */
  clearLog: () => Promise<boolean>;

  /**
   * Shut down the supervisor process
   *
   * @return {boolean} always returns True unless error
   */
  shutdown: () => Promise<boolean>;

  /**
   * Restart the supervisor process
   *
   * @return {boolean} always returns True unless error
   */
  restart: () => Promise<boolean>;

  /**
   * Get info about a process named name
   *
   * @param {string} name The name of the process (or `group:name`)
   * @return {ProcessInfo}  A structure containing data about the process
   */
  getProcessInfo: (name: string) => Promise<ProcessInfo>;

  /**
   * Get info about all processes
   *
   * @return {ProcessInfo[]} An array of process status results
   */
  getAllProcessInfo: () => Promise<ProcessInfo[]>;

  /**
   * Get info about all available process configurations. Each struct represents a single process (i.e. groups get flattened)
   *
   * @return {ConfigInfo[]} An array of process config info structs
   */
  getAllConfigInfo: () => Promise<ConfigInfo[]>;

  /**
   * Start a process
   *
   * @param {string} name Process name (or group:name, or group:*)
   * @param {boolean} wait Wait for process to be fully started `(optional)` `(default: true)`
   * @return {boolean} always returns True unless error
   */
  startProcess: (name: string, wait?: boolean) => Promise<boolean>;

  /**
   * Start all processes listed in the configuration file
   *
   * @param {boolean} wait Wait for process to be fully started `(optional)` `(default: true)`
   * @return {ProcessStatusInfo[]} An array of process status info structs
   */
  startAllProcesses: (wait?: boolean) => Promise<ProcessStatusInfo[]>;

  /**
   * Start all processes in the group named `name`
   *
   * @param {string} name The group name
   * @param {boolean} wait Wait for process to be fully started `(optional)` `(default: true)`
   * @return {ProcessStatusInfo} An array of process status info structs
   */
  startProcessGroup: (name: string, wait?: boolean) => Promise<ProcessStatusInfo[]>;

  /**
   * Stop a process named by name
   *
   * @param {string} name The name of the process to stop (or `group:name`)
   * @param {boolean} wait Wait for process to be fully stopped `(optional)` `(default: true)`
   * @return {boolean} always returns True unless error
   */
  stopProcess: (name: string, wait?: boolean) => Promise<boolean>;

  /**
   * Stop all processes in the process group named `name`
   *
   * @param {string} name The group name
   * @param {boolean} wait Wait for process to be fully stopped `(optional)` `(default: true)`
   * @return {ProcessStatusInfo[]} always returns True unless error
   */
  stopProcessGroup: (name: string, wait?: boolean) => Promise<ProcessStatusInfo[]>;

  /**
   * Stop all processes in the process list
   *
   * @param {boolean} wait Wait for process to be fully started `(optional)` `(default: true)`
   * @return {ProcessStatusInfo[]} An array of process status info structs
   */
  stopAllProcesses: (wait?: boolean) => Promise<ProcessStatusInfo[]>;

  /**
   * Send an arbitrary UNIX signal to the process named by name
   *
   * @param {string} name Name of the process to signal (or `group:name`)
   * @param {string | number} signal Signal to send, as name (`HUP`) or number (`1`)
   * @return {boolean} true on success
   */
  signalProcess: (name: string, signal: string | number) => Promise<boolean>;

  /**
   * Send a signal to all processes in the group named `name`
   *
   * @param {string} name The group name
   * @param {string | number} signal Signal to send, as name (`HUP`) or number (`1`)
   * @return {ProcessStatusInfo[]} An array of process status info structs
   */
  signalProcessGroup: (name: string, signal: string | number) => Promise<ProcessStatusInfo[]>;

  /**
   * Send a string of chars to the stdin of the process name
   * - If non-7-bit data is sent (unicode), it is encoded to utf-8 before being sent to the process’ stdin
   * - If chars is not a string or is not unicode, raise INCORRECT_PARAMETERS
   * - If the process is not running, raise NOT_RUNNING
   * - If the process’ stdin cannot accept input (e.g. it was closed by the child process), raise NO_FILE
   *
   * @param {string} name The process name to send to (or `group:name`)
   * @param {string} chars The character data to send to the process
   * @return {boolean} always returns True unless error
   */
  sendProcessStdin: (name: string, chars: string) => Promise<boolean>;

  /**
   * Send an event that will be received by event listener subprocesses subscribing to the RemoteCommunicationEvent
   *
   * @param {string} type String for the `type` key in the event header
   * @param {string} data Data for the event body
   * @return {boolean} always returns True unless error
   */
  sendRemoteCommEvent: (type: string, data: string) => Promise<boolean>;

  /**
   * Reload the configuration. The result contains three arrays containing names of process groups:
   * - `added` gives the process groups that have been added
   * - `changed` gives the process groups whose contents have changed
   * - `removed` gives the process groups that are no longer in the configuration
   *
   * @return {any} `[[added, changed, removed]]`
   */
  reloadConfig: () => Promise<any>;

  /**
   * Update the config for a running process from config file
   *
   * @param {string} name Name of process group to add
   * @return {boolean} true on success
   */
  addProcessGroup: (name: string) => Promise<boolean>;

  /**
   * Remove a stopped process from the active configuration
   *
   * @param {string} name Name of process group to remove
   * @return {boolean} Indicates whether the removal was successful
   */
  removeProcessGroup: (name: string) => Promise<boolean>;

  /**
   * Read length bytes from name’s stdout log starting at offset
   *
   * @param {string} name The name of the process (or `group:name`)
   * @param {number} offset to start reading from
   * @param {number} length Number of bytes to read from the log
   * @return {string} Bytes of log
   */
  readProcessStdoutLog: (name: string, offset: number, length: number) => Promise<string>;

  /**
   * Read length bytes from name’s stderr log starting at offset
   *
   * @param {string} name The name of the process (or `group:name`)
   * @param {number} offset to start reading from
   * @param {number} length Number of bytes to read from the log
   * @return {string} Bytes of log
   */
  readProcessStderrLog: (name: string, offset: number, length: number) => Promise<string>;

  /**
   * Provides a more efficient way to tail the (stdout) log than readProcessStdoutLog().
   * Use readProcessStdoutLog() to read chunks and tailProcessStdoutLog() to tail.
   *
   * Requests (length) bytes from the (name)'s log, starting at (offset).
   * - If the total log size is greater than (offset + length),
   * the overflow flag is set and the (offset) is automatically increased to position the buffer at the end of the log.
   * - If less than (length) bytes are available, the maximum number of available bytes will be returned.
   * (offset) returned is always the last offset in the log +1.
   *
   * @param {string} name The name of the process (or `group:name`)
   * @param {number} offset to start reading from
   * @param {number} length Maximum number of bytes to return
   * @return {any} `[string bytes, int offset, bool overflow]`
   */
  tailProcessStdoutLog: (name: string, offset: number, length: number) => Promise<any>;

  /**
   * Provides a more efficient way to tail the (stderr) log than readProcessStderrLog().
   * Use readProcessStderrLog() to read chunks and tailProcessStderrLog() to tail.
   *
   * Requests (length) bytes from the (name)'s log, starting at (offset).
   * - If the total log size is greater than (offset + length),
   * the overflow flag is set and the (offset) is automatically increased to position the buffer at the end of the log.
   * - If less than (length) bytes are available, the maximum number of available bytes will be returned.
   * (offset) returned is always the last offset in the log +1.
   *
   * @param {string} name The name of the process (or `group:name`)
   * @param {number} offset to start reading from
   * @param {number} length Maximum number of bytes to return
   * @return {any} `[string bytes, int offset, bool overflow]`
   */
  tailProcessStderrLog: (name: string, offset: number, length: number) => Promise<any>;

  /**
   * Clear the stdout and stderr logs for the named process and reopen them
   *
   * @param {string} name The name of the process (or `group:name`)
   * @return {boolean} always returns True unless error
   */
  clearProcessLogs: (name: string) => Promise<boolean>;

  /**
   * Clear the stdout and stderr logs for the named process and reopen them
   *
   * @param {string} name The name of the process (or `group:name`)
   * @return {boolean} always returns True unless error
   */
  clearProcessLog: (name: string) => Promise<boolean>;

  /**
   * Clear all process log files
   *
   * @return {ProcessStatusInfo[]} An array of process status info structs
   */
  clearAllProcessLogs: () => Promise<ProcessStatusInfo[]>;

  /**
   * Return an array listing the available method names
   *
   * @return {string[]} An array of method names available (strings)
   */
  listMethods: () => Promise<string[]>;

  /**
   * Return a string showing the method's documentation
   *
   * @param {string} name The name of the method
   * @return {string} The documentation for the method name
   */
  methodHelp: (name: string) => Promise<string>;

  /**
   * Return an array describing the method signature in the form [rtype, ptype, ptype…]
   * where rtype is the return data type of the method, and ptypes are the parameter data types
   * that the method accepts in method argument order
   *
   * @param {string} name The name of the method
   * @return {string[]} The result
   */
  methodSignature: (name: string) => Promise<string[]>;

  /**
   * Process an array of calls, and return an array of results.
   * Calls should be structs of the form {'methodName': string, 'params': array}.
   * Each result will either be a single-item array containing the result value,
   * or a struct of the form {'faultCode': int, 'faultString': string}.
   * This is useful when you need to make lots of small calls without lots of round trips.
   *
   * @param {MulticallArgs[]} calls An array of call requests
   * @return {any} The result
   */
  multicall: (calls: MulticallArgs[]) => Promise<any>;
}
