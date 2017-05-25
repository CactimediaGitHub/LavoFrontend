import Ember from 'ember';
import LongLoadingMixinMixin from 'lavo-mobile/mixins/long-loading-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | long loading mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let LongLoadingMixinObject = Ember.Object.extend(LongLoadingMixinMixin);
  let subject = LongLoadingMixinObject.create();
  assert.ok(subject);
});
