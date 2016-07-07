#!/usr/bin/env node

"use strict";

var path   = require("path"),
    fs     = require("fs"),
    config = require("config"),
    Loader = require("loader");

var views = path.join(path.resolve(), config.get('combo').views),
    base  = path.join(path.resolve(), config.get('combo').base);

var scaned = Loader.scanDir(views);
console.log("Scaned:");
console.log(scaned);

var justCombo = config.get('combo').justCombo;

var minified = Loader.minify(base, scaned, justCombo);
console.log(minified);
console.log("Compile static assets done.");

fs.writeFileSync(path.join(base, "assets.json"), JSON.stringify(Loader.map(minified)));
console.log("write assets.json done. assets.json: ");
