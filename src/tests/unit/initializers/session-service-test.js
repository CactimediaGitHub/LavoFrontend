import Ember from 'ember';
import SessionServiceInitializer from 'lavo-mobile/initializers/session-service';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | session service', {
  beforeEach() {
    Ember.run(function() {
      application = Ember.Application.create();
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  SessionServiceInitializer.initialize(application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});
