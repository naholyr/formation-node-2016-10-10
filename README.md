# Formation Node 10-12 octobre 2016

* [Copycast](http://192.168.230.219:42000/)
* [nvm](https://github.com/creationix/nvm)

## Backend

* Dépendances: `request cheerio lodash request-promise-native`

## Frontend

* Dépendances: `babel-preset-react babel-preset-es2015 react react-dom babelify browserify eslint-plugin-react uglifyify watchify classnames`
* Build: `browserify -t babelify client/index.js -g uglifyify > public/main.build.js`
* Watch: `watchify -v -d -t babelify client/index.js -o public/main.build.js`
