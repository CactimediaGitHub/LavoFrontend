import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import {ROUTE_OPEN_BASKET} from 'lavo-mobile/constants';
import OrderDeliveryMixin from 'lavo-mobile/mixins/order-delivery-mixin';

const {Route} = Ember;

export default Route.extend(OrderDeliveryMixin, AuthenticatedGuestRouteMixin, {
  orderParentRoute: ROUTE_OPEN_BASKET,
});
