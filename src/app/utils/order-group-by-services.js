import Ember from 'ember';

const { get, isEmpty } = Ember;

export default function(order, services) {
  return services.reduce((cache, service) => {
    const id = get(service, 'id');
    const orderItems = get(order, 'orderItems').filter((orderItem) => {
      return get(orderItem, 'inventoryItem.service.id') === id && get(orderItem, 'quantity') > 0;
    });

    if (!isEmpty(orderItems)) {
      cache.push({
        service,
        orderItems
      });
    }

    return cache;
  }, []);
};
