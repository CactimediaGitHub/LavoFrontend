import Ember from 'ember';

import {
  ROUTE_ADMIN_ORDER,
  ROUTE_ADMIN_ORDER_UPDATE,
} from 'lavo-mobile/constants';

const { get, Route, RSVP, inject: { service }, set } = Ember;

export default Ember.Route.extend({
  state: service(),
  renderTemplate(){
    this.render('admin.order.update.select-type',{ into: ROUTE_ADMIN_ORDER })
  },
  model(){
    const { itemTypes } = this.modelFor(ROUTE_ADMIN_ORDER);
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
      this.transitionTo(ROUTE_ADMIN_ORDER_UPDATE);
    }
  }
});

