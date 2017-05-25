import Ember from 'ember';
import InfinityQueryPathRouteMixin from 'lavo-mobile/mixins/infinity-query-path-route';
import { module, test } from 'qunit';

module('Unit | Mixin | infinity query path route');

// Replace this with your real tests.
test('it works', function(assert) {
  let InfinityQueryPathRouteObject = Ember.Object.extend(InfinityQueryPathRouteMixin);
  let subject = InfinityQueryPathRouteObject.create();
  assert.ok(subject);
});
