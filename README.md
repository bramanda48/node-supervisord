<a name="readme-top"></a>

<div align="center">
  <a href="https://github.com/bramanda48/node-supervisord">
    <img src="https://i.ibb.co/z5VT3Br/supervisord.png" alt="Supervisord" width="150px">
  </a>
  <h2 align="center">node-supervisord</h2>
  <div align="center">
    <p align="center">A Node.js library for communicating with the Supervisord XML-RPC API</p>
    <div>
        <a href="https://github.com/bramanda48/node-supervisord/releases/"><img src="https://img.shields.io/github/release/bramanda48/node-supervisord?include_prereleases=&sort=semver&color=blue" alt="GitHub release"></a>
        <a href="https://github.com/bramanda48/node-supervisord#license"><img src="https://img.shields.io/badge/License-MIT-blue" alt="License"></a>
    </div>
  </div>
</div>

## Installation & Usage

Install node-supervisord using npm:
```bash
npm install --save node-supervisord
```
Install node-supervisord using yarn:
```bash
yarn add node-supervisord
```

Example usage :
```ts
import { SupervisordClient } from "node-supervisord";

// Without authentication options
const client = new SupervisordClient("http://localhost:9001");

// With authentication options
const client = new SupervisordClient("http://localhost:9001", {
  username: "your-username",
  password: "your-passwword",
});

// Example get api version
const version = await client.getAPIVersion();
console.log(version);

```
To see the available methods, you can visit [http://supervisord.org/api.html](http://supervisord.org/api.html)

## Contributing

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/bramanda48/node-supervisord/blob/master/LICENSE.md) file for details.

## Releasing

1. Run `yarn version --[major|minor|patch]` to bump version
2. Run `git push && git push --tags` to push new tag
3. GitHub Actions will take care of the rest

## Acknowledgments

Inspiration, code snippets, icon, etc.

- [Template Typescript](https://github.com/malang-dev/template-typescript) by Malang.dev.
