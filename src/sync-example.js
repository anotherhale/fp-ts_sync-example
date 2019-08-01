"use strict";
exports.__esModule = true;
var pipeable_1 = require("fp-ts/lib/pipeable");
var IOEither_1 = require("fp-ts/lib/IOEither");
var fs = require('fs');
var yaml = require('js-yaml');
var path = require('path');
var Either_1 = require("fp-ts/lib/Either");
function readFileSync(path) {
    return IOEither_1.tryCatch(function () { return fs.readFileSync(path, 'utf8'); }, function (reason) { return new Error(String(reason)); });
}
function readYaml(content) {
    return IOEither_1.tryCatch(function () { return yaml.safeLoad(content); }, function (reason) { return new Error(String(reason)); });
}
function loadConfig(filePath) {
    return pipeable_1.pipe(readFileSync(path.resolve(filePath))(), Either_1.fold(function (e) { return IOEither_1.left(e); }, function (f) { return pipeable_1.pipe(readYaml(f)(), Either_1.fold(function (e) {
        return IOEither_1.left(e);
    }, function (c) { return IOEither_1.right(c); })); }));
}
var log = function (s) { return function () { return console.log(s); }; };
log("\nInvalid filename")();
pipeable_1.pipe(loadConfig('config.yaml')(), Either_1.fold(function (e) { return log("Failed to load config: " + e)(); }, function (c) { return log(c)(); }));
log("\nInvalid YAML file")();
pipeable_1.pipe(loadConfig('invalid-config.yaml')(), Either_1.fold(function (e) { return log("Failed to load config: " + e)(); }, function (c) { return log(c)(); }));
log("\nValid config file")();
pipeable_1.pipe(loadConfig('app-config.yaml')(), Either_1.fold(function (e) { return log("Failed to load config: " + e)(); }, function (c) { return log(c)(); }));
