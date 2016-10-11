# Formation Node 10-12 octobre 2016

* [Copycast](http://192.168.230.219:42000/)
  * Repo git : `https://github.com/naholyr/formation-node-2016-10-10`
* [nvm](https://github.com/creationix/nvm)
* Commandes utiles npm :
  * `init` → créer le package.json
  * `install` → installer les dépendances prod + dev
    * `install --production` → uniquement les dépendances prod
    * `install $NOM_MODULE` → installer un module
    * `install --save $NOM_MODULE` → installer un module et le stocker en dépendance de prod
    * `install --save-dev $NOM_MODULE` → installer un module et le stocker en dépendance de dév
    * `install --save-optional $NOM_MODULE` → installer une dépendance de prod optionnelle
  * `run` → lister les scripts
  * `home $NOM_MODULE` → ouvrir un browser sur la homepage d'un module
  * `shrinkwrap` → figer l'arborescence du node_modules avec npm-shrinkwrap.json (**ATTENTION** package.json est ignoré si ce fichier existe)
* `config` :
  * `default.ext` → git
  * `$NODE_ENV.ext` → git
  * `local.ext` → ignoré


## Backend

* Dépendances : `npm install`
* Générer DB : `node bin/build-quizz-database`

## Frontend

* Dépendances : `npm install`
* Build : `browserify -t babelify client/index.js -g uglifyify > public/main.build.js`
* Watch : `watchify -v -d -t babelify client/index.js -o public/main.build.js`
