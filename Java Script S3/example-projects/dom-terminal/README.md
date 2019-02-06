# Dom Terminal

To use this project, an Installation of **npm** with version at least **6.4.x** and a modern browser with
**ES6** Features are needed.

To run this project you need Firefox or Chrome. Because Edge / Internet Explorer are behind the ES6 development, I 
do NOT recommend to use them. They also dont have a full support for source map. 

## Initialize project 


After the project is cloned from Repository, one must run

```bash
npm install
```

ones. This command installs every dependencies at a times. Some IDE like
WebStorm can run this command automatically. Consult documentations of your favorite 
IDE/Editor. If the command causes an error, then run 

```bash
npm install --no-optional
``` 

This option can be added in other situations.

## Start a static HTTP-Server
 
To start a static HTTP-Server for testing your application run

```bash
npm run start-server
```

This task can also be called from some IDE, for example WebStorm.

To see result of your work, open a web-browser an point it to 

http://127.0.0.1:8080

To start a static HTTP-Server to see Document run

```bash
npm run doc                  # Do it once for each change of document
npm run start-doc-server     # Do it once
```

The document is served at 

http://127.0.0.1:8083


## Let webpack watch your code:

With this command

```bash
npm run watch
```

you can let `webpack` watch files in the `src` Directory. If one or more files are changed, `webpack` 
will compile them automatically. 

## Write your own code

Read the file `src/index.js` first. For each exercise you should copy the files `src/basic-template.html` and 
`src/index.js` to new files, then change the `src`-Attribute of `<script>` according to your new file. For example:

```bash
cp src/main-template.html src/power-of-2.html
cp src/index.js src/power-of-2-index.js
```

Now edit the file `src/power-of-2.html` to use the script `src/power-of-2-index.js` instead of `src/index.js`.
You can write your own code beginning with:

```javascript
window.main = function main(...argv) {
	// see demo code in src/power-of-2-index.js
};
```  
## Note: Debug your code

If the project is compiled in devlopment modus (S. NPM `script.watch` or compare `npm run watch` and `npm run build`) 
then some objects are exposed to global scope `window.debug` for debugging, so that you can access them via Browser console.
Read file `webpack.config.js` for more information!  