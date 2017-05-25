import Ember from 'ember';
import FetchUserInfoMixin from 'lavo-mobile/mixins/fetch-user-info';
import { module, test } from 'qunit';

module('Unit | Mixin | fetch user info');

// Replace this with your real tests.
test('it works', function(assert) {
  let FetchUserInfoObject = Ember.Object.extend(FetchUserInfoMixin);
  let subject = FetchUserInfoObject.create();
  assert.ok(subject);
});
