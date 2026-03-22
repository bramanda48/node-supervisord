import { UrlWithStringQuery, parse } from "url";
import { Client, createClient } from "xmlrpc";
import { $SupervisorMethod, SupervisordClientMethod } from "./methods";

type ClientOptions = Parameters<typeof createClient>[0];
type ExtendedClientOptions = ClientOptions & { socketPath?: string };

export interface SupervisordClientOptions {
  username: string;
  password: string;
}

export class SupervisordClient extends SupervisordClientMethod {
  private client: Client;

  constructor(host: string, options?: SupervisordClientOptions);
  constructor(host: UrlWithStringQuery, options?: SupervisordClientOptions);
  constructor(host: string | UrlWithStringQuery, options?: SupervisordClientOptions) {
    super();

    const clientOptions: ExtendedClientOptions = {
      path: "/RPC2",
    };

    let hostParts: UrlWithStringQuery;

    if (typeof host === "string") {
      if (!host.startsWith("http://") && !host.startsWith("unix://")) {
        host = "http://" + host;
      }
      hostParts = parse(host, false);
    } else if (host) {
      hostParts = host;
    }

    if (options) {
      clientOptions.basic_auth = {
        user: options.username,
        pass: options.password,
      };
    }

    if (hostParts.protocol === "unix:") {
      clientOptions.socketPath = hostParts.pathname;
    } else {
      clientOptions.host = hostParts.hostname || "localhost";
      clientOptions.port = parseInt(hostParts.port || "9001");
    }

    this.client = createClient(clientOptions as ExtendedClientOptions);
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
