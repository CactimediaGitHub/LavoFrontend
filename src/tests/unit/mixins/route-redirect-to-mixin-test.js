import Ember from 'ember';
import RouteRedirectToMixinMixin from 'lavo-mobile/mixins/route-redirect-to-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | route redirect to mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteRedirectToMixinObject = Ember.Object.extend(RouteRedirectToMixinMixin);
  let subject = RouteRedirectToMixinObject.create();
  assert.ok(subject);
});
