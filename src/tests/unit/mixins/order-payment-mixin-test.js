import Ember from 'ember';
import OrderPaymentMixinMixin from 'lavo-mobile/mixins/order-payment-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | order payment mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let OrderPaymentMixinObject = Ember.Object.extend(OrderPaymentMixinMixin);
  let subject = OrderPaymentMixinObject.create();
  assert.ok(subject);
});
