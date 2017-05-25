import Ember from 'ember';
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_APPROVING,
  ORDER_STATUS_UPDATING,
  PAGINATION_SIZE,
  PAGINATION_START_PAGE
} from 'lavo-mobile/constants';
import MainOrderTotal from 'lavo-mobile/mixins/main-order-total';
import InfinityQueryPathRoute from 'lavo-mobile/mixins/infinity-query-path-route';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const { Route, RSVP } = Ember;

const path = '/vendor/orders';

export default Route.extend(MainOrderTotal, InfinityQueryPathRoute, LongLoadingMixin, {
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
            ORDER_STATUS_UPDATING,
            ORDER_STATUS_APPROVING,
            ORDER_STATUS_PENDING
          ]
        },
        modelPath:'controller.model.orders',
      })
    });
  },

  actions: {
    requestOrders(page) {
      this.transitionTo({ queryParams: { page } });
    },
    willTransition(){
      return true;
    }
  }
});
