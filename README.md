# Tower Client Router

## Installation

```bash
$ component install tower/client-router
```

## Example

```js
var router = require('tower-router')
var route = router.route;

route('/posts', function(context){
  alert('!');
});

router.start();
```

## TODO

```js
/**
 * Refresh the page if there is an unhandled error.
 * 
 * @see https://github.com/visionmedia/page.js/blob/master/index.js
 */

function unhandled(context) {
  if (window.location.pathname + window.location.search == context.canonicalPath) return;
  exports.stop();
  window.location = context.canonicalPath;
}
```

Move these into [parts](https://github.com/part):

```js
/**
 * Go back `i` in history.
 *
 * @api public
 */

exports.back = function(i){
  i ? window.history.go(-i) : history.back();
}

/**
 * Go forward `i` in history.
 *
 * @api public
 */

exports.forward = function(i){
  i ? window.history.go(i) : history.forward();
}

```

## License

MIT