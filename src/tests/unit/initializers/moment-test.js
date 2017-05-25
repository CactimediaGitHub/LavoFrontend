import Ember from 'ember';
import MomentInitializer from 'lavo-mobile/initializers/moment';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | moment', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  MomentInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
