import Ember from 'ember';
import {
  ORDER_STATUS_PROCESSING,
  PAGINATION_SIZE,
  PAGINATION_START_PAGE
} from 'lavo-mobile/constants';
import MainOrderTotal from 'lavo-mobile/mixins/main-order-total';
import InfinityQueryPathRoute from 'lavo-mobile/mixins/infinity-query-path-route';

const { Route, RSVP } = Ember;

const path = '/customer/orders';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

export default Route.extend(MainOrderTotal, InfinityQueryPathRoute, LongLoadingMixin,{
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model({ page }) {
    return RSVP.hash({
      orders: this.infinityQueryPath('order', path, {
        filter: {
          state: [
            ORDER_STATUS_PROCESSING
          ]
        },
        modelPath:'controller.model.orders',
      })
    });
  },

  actions: {
    requestOrders(page) {
      this.transitionTo({ queryParams: { page } });
    }
  }
});
