import Ember from 'ember';
import * as constants from 'lavo-mobile/constants';
import groupByService from 'lavo-mobile/utils/order-group-by-services';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

const { Route, RSVP, inject, assign, get } = Ember;

export default Route.extend( AuthenticatedGuestRouteMixin, {
  ajax: inject.service(),

  model({ order_id }) {
    let { store } = this;
    let { services } = this.modelFor('admin.order');

    return RSVP.hash({
      order: store.findRecord('order', order_id, { reload: true }),
      services,
    }).then(({ order, services }) => {
      const orderItemsGroupedByService = groupByService(order, services);
      let total = order.get('total');
      let cartPromise = RSVP.resolve();
      if (!total&&!order.get('status')=='pending') {
        cartPromise = this.get('ajax').post('/cart', { data: order.serializeCustom() });
      }
      return cartPromise.then((response) => {
        if (response) {
          total = response.data.attributes.total;
        }
        return {
          total,
          order,
          orderItemsGroupedByService
        };
      });
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  },

  actions: {
    handleOrder(model, type) {
      let data = assign({}, { state: constants[type] });

      this.get('ajax').patch(`order_states/${model.get('id')}`, { data })
      .then( ({ data: { attributes : { state } } }) => {
        model.setProperties({ state });
        this.transitionTo(constants['ROUTE_ADMIN_ORDER_LIST_NEW']);
      });
    },

    acceptOpenBasket(model) {
      let data = assign({}, { state: constants['ORDER_STATUS_UPDATING'] });

      this.get('ajax').patch(`order_states/${model.get('id')}`, { data })
        .then( ({ data: { attributes : { state } } }) => {
          model.setProperties({ state });
          this.transitionTo(constants['ROUTE_ADMIN_ORDER_UPDATE'], get(model, 'id'));
        });
    }
  }
});
