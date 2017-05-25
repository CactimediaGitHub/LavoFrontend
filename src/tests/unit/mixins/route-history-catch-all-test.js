import Ember from 'ember';
import RouteHistoryCatchAllMixin from 'lavo-mobile/mixins/route-history-catch-all';
import { module, test } from 'qunit';

module('Unit | Mixin | route history catch all');

// Replace this with your real tests.
test('it works', function(assert) {
  let RouteHistoryCatchAllObject = Ember.Object.extend(RouteHistoryCatchAllMixin);
  let subject = RouteHistoryCatchAllObject.create();
  assert.ok(subject);
});
