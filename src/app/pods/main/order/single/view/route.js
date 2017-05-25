import Ember from 'ember';
import constants from 'lavo-mobile/constants';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import groupByService from 'lavo-mobile/utils/order-group-by-services';

const {Route, inject, assign, get, RSVP} = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, {
  ajax: inject.service(),

  queryParams: {
    modalOrderCancel: {},
  },

  model({order_id}) {
    let {store} = this;
    return store.findRecord('order', order_id, {reload: true}).then((order) => {
      const ajax = get(this, 'ajax');
      const inventoriesPath = `/vendors/${order.belongsTo('vendor').id()}/inventory_items`;

      return RSVP.hash({
        order: store.findRecord('order', order_id, {reload: true}),
        services: store.queryPath('service', `${inventoriesPath}/services`),
        itemTypes: store.queryPath('service', `${inventoriesPath}/item_types`),
        items: store.queryPath('service', `${inventoriesPath}/items`),
        inventories: store.queryPath('inventory-item', inventoriesPath),
        shippingMethods: store.queryPath('shipping-method', `/vendors/${order.belongsTo('vendor').id()}/shipping_methods`)
      }).then(({order, services, shippingMethods}) => {

        const orderItemsGroupedByService = groupByService(order, services);
        const totals = ajax.post('/cart', {data: order.serializeCustom()}).then(({data}) => {
          const {total, subtotal, 'promotion-amount': promotion} = data.attributes;

          return RSVP.hash({total, subtotal, promotion});
        });

        return RSVP.hash({
          order,
          totals,
          shippingMethods,
          orderItemsGroupedByService
        });
      });
    });
  },

  afterModel(model) {
    if (get(model, 'state') === constants['ORDER_STATUS_CANCELLED'] || get(model, 'state') === constants['ORDER_STATUS_REFUNDED']) {
      this.transitionTo(get(this, 'routeName'), {
        queryParams: {
          modalOrderCancel: undefined,
        }
      });
    }
  },

  renderTemplate: function () {
    this.render('main/order/single/view', {
      into: 'application'
    })
  },

  actions: {
    handleOrder({order}, type) {
      let data = assign({}, {state: constants[type]});
      this.get('ajax').patch(`order_states/${get(order, 'id')}`, {data})
        .then(({data: {attributes: {state}}}) => {
          order.setProperties({state});
          this.transitionTo(constants['ROUTE_ORDERS_LIST_NEW']);
        });
    },
    deleteOrder() {
      this.transitionTo({queryParams: {modalOrderCancel: true}})
    },
    willTransition(transition) {
      if (get(transition, 'targetName') === constants['ROUTE_ORDER_SINGLE_CANCEL']) {
        transition.abort();
        this.send('handleOrder', this.get('currentModel'), 'ORDER_STATUS_CANCELLED')
      }
    }
  }
});
