import Ember from 'ember';
import OrderDeliveryMixinMixin from 'lavo-mobile/mixins/order-delivery-mixin';
import { module, test } from 'qunit';

module('Unit | Mixin | order delivery mixin');

// Replace this with your real tests.
test('it works', function(assert) {
  let OrderDeliveryMixinObject = Ember.Object.extend(OrderDeliveryMixinMixin);
  let subject = OrderDeliveryMixinObject.create();
  assert.ok(subject);
});
