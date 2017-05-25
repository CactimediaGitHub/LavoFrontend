import Ember from 'ember';

import {
  ROUTE_ADMIN_ORDER,
  ROUTE_ADMIN_ORDER_UPDATE
} from 'lavo-mobile/constants';

const { get, Route, RSVP, inject: { service }, set } = Ember;

export default Ember.Route.extend({
  state: service(),
  renderTemplate(){
    this.render('admin.order.update.select-service',{ into: ROUTE_ADMIN_ORDER })
  },
  model(){
    const { services } = this.modelFor(ROUTE_ADMIN_ORDER);
    return {
      services
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
