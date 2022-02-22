## Ping.Me Backend Build Setup
---
Backend NodeJS env is built using a 2 step pipeline : 
* Build the JS files from the TS files into a `dist` folder : `$ tsc`
* Build the minified version, and resolve the dependencies : `babel dist --out-dir build`
