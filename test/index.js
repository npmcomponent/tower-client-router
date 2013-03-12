var route = require('..')
  , assert = require('chai').assert;

route('serverTest', function() {
  it('should build routes', function() {
    assert.equal(1 + 1, 2);
  });
});
