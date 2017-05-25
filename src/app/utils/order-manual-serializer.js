import Ember from 'ember';
import ShippingPeriodTransform from '../transforms/shipping-period';

const { get } = Ember;
const shippingPeriodTransform = new ShippingPeriodTransform();

const serializeShipping = (shipping) => {
  return {
    'address-id': get(shipping, 'address.id'),
    'shipping-method-id': get(shipping, 'shippingMethod.id'),
    'pick-up': shippingPeriodTransform.serialize(get(shipping, 'pickUp')),
    'drop-off': shippingPeriodTransform.serialize(get(shipping, 'dropOff'))
  };
};
//TODO:Improve that thing.
const serializeOrderItems = (orderItems) => {
  return orderItems.reduce((cache, orderItem) => {
    const quantity = get(orderItem, 'quantity');

    if (quantity <= 0) {
      return cache;
    }

    cache.push({
      quantity,
      'inventory-item-id': get(orderItem, 'inventoryItem.id')
    });

    return cache;
  }, []);
};

export default function orderManualSerializer(model) {
  const order = {
    'vendor-id': get(model, 'vendor.id'),
    'shipping': serializeShipping(get(model, 'shipping')),
    'order-items': serializeOrderItems(get(model, 'orderItems'))
  };

  return { order };
}
