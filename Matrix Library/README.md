# Matrix Library #

A basic library that implements a few essential matrix operations.

Based on the examples by Daniel Shiffman:
https://www.youtube.com/user/shiffman/videos

Unit tests, under the `test` folder, are built with the Jest testing engine and continuous integration tests are provided through GitHub with CircleCI. Note that Jest runs in a Node environment, so you won't have access to the DOM. Ensure a current version of Node is installed, install Jest and run with the unit tests with the command `npm test`.

If you need to run unit tests with the DOM, there are also examples of QUnit unit tests provided with this library under the `test` folder. Just run the `QUnitTests.html` with a local server: `http://127.0.0.1:<port number>/tests/QUnitTests.html`
