import Ember from 'ember';
import {
  PAGINATION_SIZE,
  PAGINATION_START_PAGE,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_REFUNDED,
  ORDER_STATUS_COMPLETED
} from 'lavo-mobile/constants';
import MainOrderTotal from 'lavo-mobile/mixins/main-order-total';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const { Route, RSVP } = Ember;

const path = '/customer/orders';

const filterDateItems = [
  {
    value: 'today',
    label: 'Today'
  },
  {
    value: 'yesterday',
    label: 'Yesterday'
  },
  {
    value: 'week',
    label: 'Week'
  },
  {
    value: 'month',
    label: 'Month'
  },
  {
    value: 'quarter',
    label: 'Quarter'
  }
];

export default Route.extend(MainOrderTotal, LongLoadingMixin, {
  queryParams: {
    page: {
      refreshModel: true
    },
    date: {
      refreshModel: true
    }
  },

  model({ page, date }) {
    const filterDate = date || 'today';

    return RSVP.hash({
      filterDateItems,
      filterDate,
      orders: this.store.queryPath('order', path, {
        filter: {
          state: [ORDER_STATUS_CANCELLED, ORDER_STATUS_REFUNDED, ORDER_STATUS_COMPLETED],
          created_at: filterDate
        },
        page: { number: page || PAGINATION_START_PAGE, size: PAGINATION_SIZE }
      })
    });
  },

  actions: {
    requestOrders(page) {
      this.transitionTo({ queryParams: { page } });
    },

    applyFilter(date) {
      this.transitionTo({ queryParams: { date } });
    }
  }
});
