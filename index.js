var map = require("map-stream"),
		consolidate = require("consolidate"),
		extend = require('extend');

module.exports = function (engine, data, options) {
	"use strict";

	options = options || {};

	if (!engine) {
		throw new Error("gulp-consolidate: No template engine supplied");
	}

	var Engine;
	try {
		Engine = require(engine);
	} catch (e) {
		throw new Error("gulp-consolidate: The template engine \"" + engine + "\" was not found. " +
				"Did you forget to install it?\n\n    npm install --save-dev " + engine);
	}

	if (typeof options.setupEngine == 'function') {
		var tmp = options.setupEngine(engine, Engine);
		if (typeof tmp != 'undefined') {
			consolidate.requires[engine] = tmp;
		}
	}

	return map(function (file, callback) {
		var fileData = data || {};

		if (file.data) {
			fileData = extend(true, {}, fileData, file.data);
		}

		function render(err, html) {
			if (err) {
				callback(err);
			} else {
				file.contents = new Buffer(html);
				callback(null, file);
			}
		}

		if (file.contents instanceof Buffer) {
			try {
				if (options.useContents) {
					consolidate[engine].render(String(file.contents), fileData, render);
				} else {
					consolidate[engine](file.path, fileData, render);
				}
			} catch (err) {
				callback(err);
			}
		} else {
			callback(new Error("gulp-consolidate: streams not supported"), undefined);
		}
	});
};
