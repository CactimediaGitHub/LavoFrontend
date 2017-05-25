import Ember from 'ember';

import {
  ROUTE_MAKE_ORDER,
  ROUTE_MAKE_ORDER_BASKET
} from 'lavo-mobile/constants';

const { get, Route, RSVP, inject: { service }, set } = Ember;

export default Ember.Route.extend({
  state: service(),
  model(){
    const { itemTypes } = this.modelFor(ROUTE_MAKE_ORDER);
    return {
      itemTypes
    }
  },
  setupController(controller,model){
    this._super(...arguments);
    set(controller, 'state', this.state);
  },
  actions:{
    done(){
      this.transitionTo(ROUTE_MAKE_ORDER_BASKET);
    }
  }
});