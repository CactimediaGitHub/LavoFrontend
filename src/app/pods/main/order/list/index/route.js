import Ember from 'ember';
import {ROUTE_ORDERS_LIST_NEW} from 'lavo-mobile/constants';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

export default Ember.Route.extend(LongLoadingMixin, {
  beforeModel() {
    this.transitionTo(ROUTE_ORDERS_LIST_NEW);
  }
});
