import { moduleFor, test } from 'ember-qunit';

moduleFor('validator:shipping-date', 'Unit | Validator | shipping-date', {
  needs: ['validator:messages']
});

test('it works', function(assert) {
  var validator = this.subject();
  assert.ok(validator);
});
