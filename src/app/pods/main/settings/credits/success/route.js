import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    creditsAmount: null
  },
  model(params, { queryParams }) {
    return queryParams;
  },
});
