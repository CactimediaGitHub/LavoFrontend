import Ember from 'ember';
import RouteFormMixinMixin from 'lavo-mobile/mixins/route-form-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | route form mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteFormMixinObject = Ember.Object.extend(RouteFormMixinMixin);
  let subject = RouteFormMixinObject.create();
  assert.ok(subject);
});
