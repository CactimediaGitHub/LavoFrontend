import Ember from 'ember';
import MainOrderTotalMixin from 'lavo-mobile/mixins/main-order-total';
import { module, test } from 'qunit';

module('Unit | Mixin | main order total');

// Replace this with your real tests.
test('it works', function(assert) {
  let MainOrderTotalObject = Ember.Object.extend(MainOrderTotalMixin);
  let subject = MainOrderTotalObject.create();
  assert.ok(subject);
});
