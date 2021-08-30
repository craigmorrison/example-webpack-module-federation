# Module Federation - Portal Example

A set of applications showing how Webpack's Module Federation feature can be used to faciliate a micro-frontend architecture.

## Requirements

You need to have Node.js and Yarn installed

If you have Node.js and NPM, you can install Yarn with the command: `npm i -g yarn`

## Installing and running

Install with `Yarn install`

Run with `Yarn start`

This will start all of the applications:

- Portal (host application): http://localhost:3000
- Table App: http://localhost:3001
- Counter App: http://localhost:3002
- People App (React example): http://localhost:3003

The Portal application will consume the federated Table and Counter applications from their servers.

## Links

- [Module Federation project on GitHub](https://github.com/module-federation)
- [Webpack documentation for it's Module Federation support](https://webpack.js.org/concepts/module-federation/)
