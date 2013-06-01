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

## License

MIT