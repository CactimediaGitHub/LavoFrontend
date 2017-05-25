import Ember from 'ember';
import { ROUTE_VENDOR_LIST } from 'lavo-mobile/constants';

const { get, inject: { service }, Component } = Ember;

export default Component.extend({
  network: service(),
  routeHistory: service(),
  classNames: ['ui', 'blue', 'modal-box'],
  router: service('-routing'),

  actions: {
    close() {
      this.sendAction('dismiss');
    },

    reconnect() {
      const router = get(this, 'router');

      if(get(this,'network.isOnline')){
        this.sendAction('dismiss');
        router.transitionTo(ROUTE_VENDOR_LIST, null, { queryParams: { modalConnection: undefined } });
      }
    }
  }
});
