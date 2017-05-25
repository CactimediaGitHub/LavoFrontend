import Ember from 'ember';
import { ROUTE_OPEN_BASKET_DELIVERY, ROUTE_OPEN_BASKET_SUCCESS } from 'lavo-mobile/constants';

const { inject: { service }, get } = Ember;

export default Ember.Route.extend({
  ajax: service(),

  model(){
    return this.store.findRecord('page', 'terms');
  },

  renderTemplate: function() {
    this.render('main/open-basket/terms-and-conditions', {
      into: 'application'
    })
  },

  actions: {

    agree() {
      const ajax = get(this, 'ajax');
      const order = get(this.modelFor(ROUTE_OPEN_BASKET_DELIVERY), 'order');
      let data = order.serializeCustom();
      delete data.order['order-items'];
      ajax.post('/openbasket_orders', { data })
        .then((response) => {
          get(this, 'store').peekAll('order-item').filterBy('isNew', true).forEach(orderItem => {
            get(this, 'store').unloadRecord(orderItem);
          });
          if (response) {
            this.transitionTo(ROUTE_OPEN_BASKET_SUCCESS);
          }
        });
    },
    back(){
      history.back();
    }
  }
});
