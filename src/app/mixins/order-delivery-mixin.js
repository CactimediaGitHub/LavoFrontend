import Ember from 'ember';
import moment from 'moment';

import {
  DELIVERY_PERIOD_DEFAULT,
  ROUTE_MAKE_ORDER_SHIPPING
} from 'lavo-mobile/constants';
const { get, set, RSVP } = Ember;


export default Ember.Mixin.create({
  orderParentRoute: null,
  model() {
    this._super(...arguments);
    let selectedMethodId;
    const { store } = this;
    const { order } = this.modelFor(get(this,'orderParentRoute'));
    const currentModel = this.modelFor(this.routeName);

    if(currentModel){
      selectedMethodId = get(currentModel, 'selectedMethodId');
    }
    const vendorId = get(order,'vendor.id');
    const shipping = get(order, 'shipping');

    return RSVP.hash({
      shippingMethods: store.queryPath('shipping-method', `/vendors/${vendorId}/shipping_methods`)
    }).then(({ shippingMethods }) => {
      let shippingMethod = shippingMethods.findBy('id', selectedMethodId) || shippingMethods.objectAt(0);
      let deliveryPeriod;
      let pickUp;
      let dropOff;

      if (shippingMethod) {
        deliveryPeriod = get(shippingMethod, 'deliveryPeriod') || DELIVERY_PERIOD_DEFAULT;

        pickUp = moment().startOf('day');
        dropOff = pickUp.clone();

        shipping.setProperties({
          shippingMethod: shippingMethod,
          pickUp: [pickUp, null],
          dropOff: [dropOff, null]
        });
      }

      return RSVP.resolve({
        order,
        shippingMethods,
        selectedMethodId: shippingMethod ? get(shippingMethod, 'id') : null
      });
    });
  },


  actions: {
    selectShippingMethod(shippingMethod) {
      const { order } = this.modelFor(get(this,'orderParentRoute'));
      const shipping = get(order, 'shipping');

      set(shipping, 'shippingMethod', shippingMethod);
    },

    willTransition(transition) {
      const { order } = this.modelFor(get(this,'orderParentRoute'));

      if (transition.targetName === ROUTE_MAKE_ORDER_SHIPPING && !get(order, 'shipping.shippingMethod.id')) {
        transition.abort();
      }
      return true;
    }
  }
});
