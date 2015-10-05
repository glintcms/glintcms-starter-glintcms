# glintcms-starter-glintcms

This is a WebSite implementation with GlintCMS.
It shows how you can use GlintCMS.


# GlintCMS Documentation

- [documentation](https://github.com/glintcms/glintcms)
- [glintcms](http://glintcms.com/)


# prerequisites

make sure you have got [node.js](https://nodejs.org) installed on your system.

so far it has been tested with node 0.12.x and 4.x on mac os x and on ubuntu.

```bash
# for development, nodemon is helpful
npm install -g nodemon
```

# use

this starter contains a whole web site including the data storage.

It uses the filesystem as the storage adapter: `glint-adapter-fs`.

Therefore you don't have to install a database to run it.



## npm module

> you can install it as a module for your express or connect application.

#### install

```bash
# install in your app
npm install glintcms-starter-glintcms --save

# copy the datastore into your app
cp -r node_modules/glintcms-starter-glintcms/datastore/ datastore
```

#### run

> you can run it as a standalone application like this:

```javascript
var glintcms = require('glintcms-starter-glintcms');
glintcms.listen(process.env.PORT || 3000);
```

> or you can mount it into your web application:

```javascript
var express = require('express');
var app = express();
var glintcms = require('glintcms-starter-glintcms');

app.get('/', function(req, res, next){
  res.send('<h1>my new homepage</h1> check it out: <a href="/cms">GlintCMS</a>');
});

app.get('/cms', function(req, res, next){
  req.url = '/';
  next();
});

app.use(glintcms.app);

app.listen(process.env.PORT || 3000);
```



## standalone

> you can install it with git clone.
> this is the preferred way, when you want to take it as a starting point to develop your own app with GlintCMS

#### install

```bash
# change directory into the directory you want `glintcms-starter-glintcms` to be created
git clone https://github.com/glintcms/glintcms-starter-glintcms && cd glintcms-starter-glintcms
npm run prepublish && npm install && npm run install-local
```

#### run

```bash
# build it and run it
npm run build && node start

# or start with automatic restart on file changes
npm run www

# if you want to run it with a specific port
export PORT=3000; npm run www
```


# browse & edit

1. open the website: [http://localhost:8080/](http://localhost:8080/)
2. login via: [http://localhost:8080/login](http://localhost:8080/login)
- user: `content@intesso.com`
- password: `ContentContent`


# project structure

The directories `lib/*` contain the local modules [bundledDependencies](https://docs.npmjs.com/files/package.json#bundleddependencies) for this starter project.
These modules are like normal unpublished npm modules, that are just contained in this project. It does not really make sense to publish them because they are very project specific.

The advantage to treat them as npm modules are:
- They are self contained and have defined dependencies in the `package.json`.
- It is easier to copy them into another project
- It lets you avoid [deep relative links](https://github.com/substack/browserify-handbook#avoiding-)


**During `development`**

These modules are symlinked into the `node_modules` directory, when running `npm run build`


**In `production`**

When running `npm run build` they are copied into the `node_modules` directory


# author

Andi Neck | [@andineck](https://twitter.com/andineck) | andi.neck@intesso.com | intesso


# get involved

Any Feedback is highly appreciated.
Please create an [Issue](https://github.com/glintcms/glintcms-starter-glintcms/issues/new) or [PR](https://github.com/glintcms/glintcms-starter-glintcms/pulls).
I'm happy to add you as a comitter too.


# license

MIT

