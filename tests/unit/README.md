# TidyBee Front-End Unit tests
Folder containing unit tests for TidyBee. Unit tests are essential to ensure that the various parts of the application work in isolation.

## Available commands

1. Running tests
To run unit tests, use the following command:
npm run test:unit
This command will run the tests and display the results in the console.

## Test conventions

1. File structure
Test files should be placed in the tests/unit/ directory.

2. Naming test files
Test files should be named using the file-name.spec.js convention.

3. Using test libraries
This project uses Jest as the default test framework for unit testing. Assertions can be made with Jest or other libraries such as 'chai' or 'expect'.

4. Test organization
Organize your tests by functionality or component, using 'describe' blocks to group and describe expected behavior.