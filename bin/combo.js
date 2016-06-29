#!/usr/bin/env node

"use strict";

var path     = require("path");
var fs       = require("fs");
var Loader   = require("loader");

var viewsDir = path.join(process.cwd(), process.argv[2]);
var baseDir  = path.join(process.cwd(), process.argv[3]);

var scaned   = Loader.scanDir(viewsDir);
console.log("Scaned:");
console.log(scaned);

var justCombo = process.argv[4];

var minified = Loader.minify(baseDir, scaned, justCombo);
console.log(minified);
console.log("Compile static assets done.");

fs.writeFileSync(path.join(baseDir, "assets.json"), JSON.stringify(Loader.map(minified)));
console.log("write assets.json done. assets.json: ");
console.log(fs.readFileSync(path.join(baseDir, "assets.json"), "utf-8"));
