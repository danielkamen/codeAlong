# Project Setup

## Install Dependencies
```bash
npm install monaco-editor monaco-editor-webpack-plugin react-app-rewired --save-dev
npm install socket.io-client monaco-editor
```


Backend (Spring Boot):
Make sure to refresh the maven project after any updates to pom.xml
```bash
mvn clean install
mvn spring-boot:run
```

Notes:
Used latest version of Maven.
Project developed in IntelliJ IDEA.
JDK 21 used.



Wish List
1. ~~fix the bug where room gets reset when someone joins~~ 
2. Add user accounts and multiple documents
3. Allow users to save the file to their account (long-term database for document access)
4. Add cursor location support (show where people's cursors are)
5. Add highlighting support (show where people are highlighting)
6. Add ability to write and compile code
7. Add support for password-protected rooms
8. ~~Allow custom URLs for room identification~~