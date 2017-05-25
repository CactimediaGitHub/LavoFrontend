import Ember from 'ember';

export default Ember.Route.extend({
  model({ alias }) {
    return this.store.findRecord('page', alias);
  },
});
