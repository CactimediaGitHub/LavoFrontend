import Ember from 'ember';

export default Ember.Route.extend({
  queryParams: {
    errorMessage: {
      replace: true
    }
  },
  model(params, { queryParams }){
    return queryParams
  },
});
