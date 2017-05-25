import Ember from 'ember';
import GuestRouteMixinMixin from 'lavo-mobile/mixins/guest-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | guest route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let GuestRouteMixinObject = Ember.Object.extend(GuestRouteMixinMixin);
  let subject = GuestRouteMixinObject.create();
  assert.ok(subject);
});
