# Matrix Library
[![Build Status](https://circleci.com/gh/Carla-de-Beer/JavaScript.png?&style=shield&circle-token=:circle-token)](https://circleci.com/gh/Carla-de-Beer/JavaScript)

A basic library that implements a few essential matrix operations.

Based on the examples by Daniel Shiffman:
https://www.youtube.com/user/shiffman/videos

Unit tests, under the `test` folder, are built with the [Jest](https://facebook.github.io/jest/) testing engine. Note that Jest runs in a Node.js environment, so you won't have access to the DOM. Ensure a current version of Node.js is installed, then install Jest and run the unit tests with the command `npm run test`. Continuous integration is effected by means of CircleCI and the master branch is protected.

If you need to run unit tests with the DOM, there are also examples of [QUnit](https://qunitjs.com) unit tests provided with this library under the `test` folder. Just run the `QUnitTests.html` with a local server: `http://127.0.0.1:<port number>/tests/QUnitTests.html`.

ESlint has been added to this project.
