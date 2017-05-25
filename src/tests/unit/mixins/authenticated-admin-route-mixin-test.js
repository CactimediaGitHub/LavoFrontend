import Ember from 'ember';
import AuthenticatedAdminRouteMixinMixin from 'lavo-mobile/mixins/authenticated-admin-route-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | authenticated admin route mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let AuthenticatedAdminRouteMixinObject = Ember.Object.extend(AuthenticatedAdminRouteMixinMixin);
  let subject = AuthenticatedAdminRouteMixinObject.create();
  assert.ok(subject);
});
