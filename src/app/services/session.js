import EmberSimpleAuthSessionService from 'ember-simple-auth/services/session';
import Ember from 'ember';

const { get, computed, inject: { service }, String: { singularize } } = Ember;

export default EmberSimpleAuthSessionService.extend({
  store: service(),

  currentUser: computed('isAuthenticated', function() {

    if (!get(this, 'isAuthenticated')) {
      return null;
    }

    const store = get(this, 'store');
    let { type, id } = get(this, 'data.authenticated.data');
    const user = store.peekRecord(singularize(type), id);

    if (user) {
      return user;
    }
  }),

  isCustomer: computed('isAuthenticated', function() {
    return get(this, 'isAuthenticated') && get(this, 'data.authenticated.data.type') === 'customers';
  })
});
