# Plain HTML JavaScript

To use this project, an Installation of **npm** with version at least **6.4.x** and a modern browser with
**ES6** Features are needed. Edge and Internet Explorer are not supported. So please use Firefox or Chrome.
This project is not tested on Safari. 

## Initialize project 


After the project is cloned from Repository, one must run

```bash
npm install
```

once. This command installs every dependencies at a times. Some IDE like
WebStorm can run this command automatically. Consult documentations of your favorite 
IDE/Editor.

## Start a static HTTP-Server
 
To start a static HTTP-Server for testing run

```bash
npm run start-server
```

This task can also be called from some IDE, for example WebStorm.

To see result of your work, open a web-browser an point it to 

http://127.0.0.1:8080

## Write your own code

Read the file `src/main.js` first. For each exercise you should copy the files `src/basic-template.html` and 
`src/main.js` to new files, then change the `src`-Attribute of `<script>` according to your new file. For example:

```bash
cp src/main-template.html src/example-1.html
cp src/main.js src/example-1.js
```

Now edit the file `src/example-1.html` to use the script `src/example-1.js` instead of `src/main.js`. You can now write
your code, beginning from function `main(...argv)`.
  
