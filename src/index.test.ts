import { SupervisordClient } from "./index";

describe("SupervisordClient test cases", () => {
  const client = new SupervisordClient("http://localhost:9001", {
    username: "docker-mailserver",
    password: "docker-mailserver-password",
  });

  it("SupervisordClient must be defined", async () => {
    expect(client).toBeDefined();
  });

  it("Version must be defined", async () => {
    expect(await client.getAPIVersion()).toBeDefined();
  });
});
