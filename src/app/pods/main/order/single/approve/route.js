import Ember from 'ember';
import {
  ORDER_STATUS_PROCESSING,
  ORDER_STATUS_CANCELLED,
  ROUTE_ORDERS_LIST_NEW,
  ROUTE_ORDER_SINGLE_PAYMENT
} from 'lavo-mobile/constants';
import groupByService from 'lavo-mobile/utils/order-group-by-services';

const { Route, RSVP, get, inject: { service }, assign } = Ember;

export default Route.extend({
  ajax: service(),

  queryParams: {
    vendorId: {}
  },

  renderTemplate: function() {
    this.render('main/order/single/approve', {
      into: 'application'
    })
  },

  model ({ order_id }, { queryParams: { vendorId } }) {

    let { store } = this;
    const ajax = get(this,'ajax');
    const inventoriesPath = `/vendors/${vendorId}/inventory_items`;

    return RSVP.hash({
      order: store.findRecord('order', order_id, { reload: true }),
      services: store.queryPath('service', `${inventoriesPath}/services`),
      itemTypes: store.queryPath('service', `${inventoriesPath}/item_types`),
      items: store.queryPath('service', `${inventoriesPath}/items`),
      inventories: store.queryPath('inventory-item', inventoriesPath),
      shippingMethods: store.queryPath('shipping-method', `/vendors/${vendorId}/shipping_methods`)
    }).then(( { order, services, shippingMethods } ) => {

      const orderItemsGroupedByService = groupByService(order, services);
      const totals = ajax.post('/cart', { data: order.serializeCustom() }).then(({data}) => {

        const { total, subtotal, 'promotion-amount': promotion } = data.attributes;

        return RSVP.hash({total, subtotal, promotion});
      });

      return RSVP.hash({
        order,
        totals,
        shippingMethods,
        orderItemsGroupedByService
      });
    })
  },
  actions: {
    submit (order, state) {

      this.get('ajax').patch(`order_states/${get(order, 'id')}`, {data: {state}})
        .then(() => {
          order.setProperties({state});
          this.transitionTo(ROUTE_ORDERS_LIST_NEW);
        });
    }
  }
});
