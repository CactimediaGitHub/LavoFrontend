import Ember from 'ember';
import {
  ROUTE_MAKE_ORDER,
  ROUTE_MAKE_ORDER_CART,
  CHECKOUT_TYPE_CREDITS,
  CHECKOUT_TYPE_CARD,
  CHECKOUT_TYPE_PARTIAL
} from 'lavo-mobile/constants';
import OrderPaymentMixin from 'lavo-mobile/mixins/order-payment-mixin';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const { get, set, inject: { service }, Route, RSVP, assign } = Ember;

export default Route.extend(OrderPaymentMixin, LongLoadingMixin, {
  ajax: service(),
  orderParentRoute: ROUTE_MAKE_ORDER,

  actions: {
    willTransition(transition) {
      const model = this.modelFor(ROUTE_MAKE_ORDER);
      const alert = get(this,'dialogWindow.alert');
      const checkoutType = get(model, 'order.checkoutType');
      //@TODO: Move some logic to model validation

      if (transition.targetName === ROUTE_MAKE_ORDER_CART && !checkoutType) {
        transition.abort();
        alert('Please, check checkout method!');
      }

      return true;
    },
  }
})