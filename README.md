Boilerplate
===========

## Getting started
We need to install a few things: [Node](http://nodejs.org), [Bower](http://bower.io) and [Gulp](http://gulpjs.com)

- **Node**: [Download](http://nodejs.org) and install - hey, it's very easy :)
- **Bower**: If you have Node installed, simply run `npm install -g bower` - see the [Documentation](http://bower.io/#install-bower) (maybe you need to run this command with `sudo`)
- **Gulp**: Simple as bower `npm install -g gulp` see the [Documentation](https://github.com/gulpjs/gulp/blob/master/docs/getting-started.md#getting-started) (maybe you need to run this command with `sudo`)

In your CLI `cd` into the repo and then run `bower install` and `npm install`. This will download all vendors in the `bower_components` directory and all gulp-module in the `node_modules` directory.

Now run `gulp` and start working. Gulp compiles your `.scss` files and concatinates and uglifies your `.js` files

## Shortform CLI
- bower install
- npm install
- gulp