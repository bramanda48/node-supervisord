import { UrlWithStringQuery, parse } from "url";
import { Client, createClient } from "xmlrpc";
import { $SupervisorMethod, SupervisordClientMethod } from "./methods";

export interface SupervisordClientOptions {
  username: string;
  password: string;
}

export class SupervisordClient extends SupervisordClientMethod {
  private client: Client;

  constructor(host: string, options?: SupervisordClientOptions) {
    super();

    let hostParts: UrlWithStringQuery;
    let basicAuth: { user: string; pass: string };

    if (typeof host == "string") {
      if (host.indexOf("http") !== 0) {
        host = "http://" + host;
      }
      hostParts = parse(host, false);
      if (options) {
        basicAuth = {
          user: options.username,
          pass: options.password,
        };
      }
    } else if (host) {
      hostParts = host;
    }

    if (!hostParts.hostname) hostParts.hostname = "localhost";
    if (!hostParts.port) hostParts.port = "9001";

    this.client = createClient({
      host: hostParts.hostname,
      port: parseInt(hostParts.port),
      path: "/RPC2",
      basic_auth: basicAuth,
    });
  }

  _call(method: string, params: any[], callback: (err: any, result: object) => void) {
    this.client.methodCall(method, params, callback);
  }
}

$SupervisorMethod.forEach((method) => {
  const methodName = method.split(".").pop();
  SupervisordClient.prototype[methodName] = function (...params: any) {
    return new Promise((resolve, reject) => {
      this._call(method, params, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  };
});
