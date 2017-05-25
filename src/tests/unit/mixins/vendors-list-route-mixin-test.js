import Ember from 'ember';
import VendorsListRouteMixinMixin from 'lavo-mobile/mixins/vendors-list-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | vendors list route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let VendorsListRouteMixinObject = Ember.Object.extend(VendorsListRouteMixinMixin);
  let subject = VendorsListRouteMixinObject.create();
  assert.ok(subject);
});
