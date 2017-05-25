import Ember from 'ember';
import RoutePasswordResetMixinMixin from 'lavo-mobile/mixins/route-password-reset-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | route password reset mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let RoutePasswordResetMixinObject = Ember.Object.extend(RoutePasswordResetMixinMixin);
  let subject = RoutePasswordResetMixinObject.create();
  assert.ok(subject);
});
