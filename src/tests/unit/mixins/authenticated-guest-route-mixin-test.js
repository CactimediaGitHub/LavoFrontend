import Ember from 'ember';
import AuthenticatedGuestRouteMixinMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | authenticated guest route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthenticatedGuestRouteMixinObject = Ember.Object.extend(AuthenticatedGuestRouteMixinMixin);
  let subject = AuthenticatedGuestRouteMixinObject.create();
  assert.ok(subject);
});
