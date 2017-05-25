import Ember from 'ember';
import {
  ROUTE_ADMIN_ORDER_LIST_NEW,
  ORDER_STATUS_PENDING,
  ORDER_STATUS_PROCESSING,
  ORDER_STATUS_COMPLETED,
  ORDER_STATUS_CANCELLED,
  ORDER_STATUS_REFUNDED,
  ORDER_STATUS_UPDATING,
  PAGINATION_SIZE,
  PAGINATION_START_PAGE,
  ROUTE_ADMIN_ORDER_LIST,
  ROUTE_ADMIN_ORDER_LIST_INDEX
} from 'lavo-mobile/constants';

import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

const { get, Route, RSVP } = Ember;
const path = '/vendor/orders';

const getTotalCount = (model) => {
  return get(model, 'meta.total-count') || 0;
};

const paginationParams = {
  page: {
    number: PAGINATION_START_PAGE,
    size: PAGINATION_SIZE
  }
};

export default Route.extend( AuthenticatedGuestRouteMixin, {

  beforeModel({targetName}) {
    if (!!~targetName.indexOf('index')) {
      this.transitionTo(ROUTE_ADMIN_ORDER_LIST_NEW);
    }
  },

  model() {

    return {
      newOrdersCount: 0,
      allOrdersCount: 0,
      historyOrdersCount: 0
    };

  },
  actions: {
    willTransition({targetName}){

      if(targetName===ROUTE_ADMIN_ORDER_LIST_INDEX){
        this.transitionTo(ROUTE_ADMIN_ORDER_LIST_NEW);
      }
    }
  }
});
