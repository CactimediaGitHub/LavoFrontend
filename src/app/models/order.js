import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';
import orderManualSerializer from '../utils/order-manual-serializer';
import { CHECKOUT_TYPE_CASH } from 'lavo-mobile/constants';

const { get, computed } = Ember;

export default Model.extend({
  vendor: belongsTo('vendor'),
  customer: belongsTo('customer'),
  address: belongsTo('shipping-address'),
  orderItems: hasMany('order-item'),
  state: attr(),
  total: attr('number', { defaultValue: 0 }),
  shipping: belongsTo('shipping', { async: false }),
  openbasket: attr('boolean', { defaultValue: false }),
  createdAt: attr(),
  updatedAt: attr(),

  //@TODO: Maybe extract this to own model or service?
  checkoutType: CHECKOUT_TYPE_CASH,
  numberCard: null,
  card: belongsTo('card'),
  isPaymentSplit: false,
  amountOfCredits: 0,
  calculatedTotal: false,
  amountOfCreditsForPartialPayment: 0,
  amountOfCardCashForPartialPayment: computed('cpTotalWithShipping', 'amountOfCreditsForPartialPayment', function() {
      return (get(this, 'calculatedTotal') || get(this, 'cpTotalWithShipping')) - get(this, 'amountOfCreditsForPartialPayment');
  }),
  amountOfRemainingCredits: computed('amountOfCreditsForPartialPayment', 'amountOfCredits', function() {
     return  get(this, 'amountOfCredits') - get(this, 'amountOfCreditsForPartialPayment');
  }),

  cpTotal: computed('orderItems.[]', 'orderItems.@each.quantity', function() {
    return get(this, 'orderItems').reduce((sum, item) => {
      return sum + get(item, 'cpPrice');
    }, 0);
  }),

  cpTotalWithShipping: computed('cpTotal', 'shipping.shippingMethod.shippingCharge', function() {
    return get(this, 'cpTotal') + (get(this, 'shipping.shippingMethod.shippingCharge') || 0);
  }),

  cpQuantity: computed('orderItems.[]', 'orderItems.@each.quantity', function() {
    return get(this, 'orderItems').reduce((quantity, item) => {
      return parseInt(quantity) + get(item, 'quantity');
    }, 0);
  }),

  serializeCustom() {
    return orderManualSerializer(this);
  }
});
