# Tower Client Router

- https://github.com/visionmedia/page.js/blob/master/index.js
- https://developer.mozilla.org/en-US/docs/DOM/Manipulating_the_browser_history
- https://github.com/component/set
- https://github.com/visionmedia/node-methods

## Installation

```bash
component install tower/router
```

## Example

```js
var router = require('tower-router')
  , route = router.route;

route('/posts')
  .on('enter', function(context){
    context.render('posts');
  });

router.start();
```

## License

MIT