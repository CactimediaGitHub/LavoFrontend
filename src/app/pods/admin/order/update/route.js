import Ember from 'ember';
import DS from 'ember-data';
import {
  ROUTE_ADMIN_ORDER,
  ROUTE_ADMIN_ORDER_SHOW,
  ROUTE_ADMIN_ORDER_LIST_NEW
} from 'lavo-mobile/constants';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

const { get, set, Route, RSVP, inject: { service }, computed } = Ember;

export default Route.extend( AuthenticatedGuestRouteMixin, {
  ajax: service(),
  state: service(),

  model(params) {
    let { store } = this;
    const { inventories } = this.modelFor(ROUTE_ADMIN_ORDER);
    return RSVP.hash({
      order: store.findRecord('order', get(params, 'order_id'), { reload: true }),
    }).then(( { order } ) => {

      if (!get(order, 'orderItems.length')) {
        let { store } = this;

        const allOrderItems = inventories.map((inventory) => {
          return store.createRecord('order-item', {
            inventoryItem: inventory
          });
        });

        set(order, 'orderItems', allOrderItems);
      }
      return RSVP.resolve({
        order
      });
    });
  }

});
