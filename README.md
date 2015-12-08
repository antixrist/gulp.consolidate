Template engine consolidation for `gulp` using `consolidate.js`.

## Usage

Install `gulp-consolidate` as a development dependency:

```shell
npm install --save-dev gulp.consolidate
```

Then, add it to your `gulpfile.js` (compatible with `gulp-data`):

```javascript
var gulpConsolidate = require("gulp.consolidate");

var getJsonData = function(file) {
  return require('./examples/' + path.basename(file.path) + '.json');
};

gulp.src('./src/*.html')
	.pipe(gulpData(getJsonData))
	.pipe(gulpConsolidate("swig", {
		msg: "Hello Gulp!"
	}, {
		setupEngine: function (engineName, Engine) {
			return Engine;
		}
		//useContents: true
	}))
	.pipe(gulp.dest('./dist'));
```

## API

### gulpConsolidate(engine[, data][, options])

#### engine
Type: `String`

The `consolidate.js` supported template engine used to render each file.


```js
consolidate('swig');
```

_Note:_ The template engine must also be installed via npm.

```shell
npm install --save-dev swig
```

#### data
Type: `Object`

The data to use to render the templates.

```js
consolidate('swig', {
	msg: "Hello World"
});
```


#### options
Type: `Object`

Additional options.


#### options.useContents
Type: `Boolean`
Default: `false`

```js
consolidate('swig', data, { useContents : true });
```

Most times, you will want to render templates that include other files. In order to do so, the filenames will be passed to consolidate rather than the file contents.

If you would rather pass the file contents to consolidate, set the `useContents` option to true.

## License

WTFPL License
