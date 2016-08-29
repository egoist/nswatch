# nswatch

[![NPM version](https://img.shields.io/npm/v/nswatch.svg?style=flat-square)](https://npmjs.com/package/nswatch) [![NPM downloads](https://img.shields.io/npm/dm/nswatch.svg?style=flat-square)](https://npmjs.com/package/nswatch) [![Build Status](https://img.shields.io/circleci/project/egoist/nswatch/master.svg?style=flat-square)](https://circleci.com/gh/egoist/nswatch)

> Like gulp.watch but for npm scripts.

## Install

```bash
$ npm install --save nswatch
```

## Usage

Assuming you have an npm script `build` to compile something, then drop a `watch.js` in your project:

```js
const watch = require('nswatch')

watch('src/*.js', ['build'])
```

When you run `node watch`, the `npm run build` will be invoked right away, and will also be invoked when file changes are detected.

<img src="./media/preview.png" width="500" />

### Parallel and Sequence

`Array` will be treated as parallel, `String` will be treated as sequence:

```js
// run in parallel
watch('src/a.js', ['task-a', 'task-b'])
// run insequence
// use ! as seperator
watch('src/b.js', 'task-a!task-b')
```

## CLI

```bash
$ npm install -g nswatch
```

You can also use `nswatch` as a command-line program:

```bash
# in parallel
$ nswatch "src/*.js" --script foo --script bar

# in sequence
$ nswatch "src/*.js" --script "foo!bar"
```

## License

MIT © [egoist](https://github.com/egoist)
