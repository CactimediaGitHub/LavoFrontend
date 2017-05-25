import Ember from 'ember';
import { ROUTE_MAKE_ORDER } from 'lavo-mobile/constants';
import OrderDeliveryMixin from 'lavo-mobile/mixins/order-delivery-mixin';

const { Route } = Ember;

export default Route.extend(OrderDeliveryMixin, {
  orderParentRoute: ROUTE_MAKE_ORDER,
});
