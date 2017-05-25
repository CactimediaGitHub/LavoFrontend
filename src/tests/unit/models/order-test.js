import Ember from 'ember';
import {moduleForModel, test} from 'ember-qunit';

moduleForModel('order', 'Unit | Model | order', {
  needs: [
    'model:vendor',
    'model:address',
    'model:customer',
    'model:review',
    'model:schedule',
    'model:shipping',
    'model:shipping-method',
    'model:inventory-item',
    'model:item',
    'model:service',
    'model:order-item',
    'validator:presence'
  ]
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

test('custom serialize', function(assert) {
  const store = this.store();
  const order = this.subject();

  Ember.run(() => {
    order.setProperties({
      customer: store.createRecord('customer', { id: 1 }),
      vendor: store.createRecord('vendor', { id: 1 }),
      shipping: store.createRecord('shipping', {
        id: 1,
        pickUo: '2016-06-16 11:34:08..2016-06-16 13:34:08',
        dropOff: '2016-06-16 11:34:08..2016-06-16 13:34:08',
        address: store.createRecord('address', { id: 1 }),
        shippingMethod: store.createRecord('shipping-method', { id: 1 })
      }),
      orderItems: [
        store.createRecord('order-item', {
          id: 1,
          inventoryItem: store.createRecord('inventory-item', { id: 40 }),
          quantity: 2
        }),
        store.createRecord('order-item', {
          id: 2,
          inventoryItem: store.createRecord('inventory-item', { id: 41 }),
          quantity: 5
        }),
        store.createRecord('order-item', {
          id: 3,
          inventoryItem: store.createRecord('inventory-item', { id: 42 }),
          quantity: 0
        })
      ]
    });
  });

  const expected = {
    "order": {
      "customer-id": "1",
      "order-items": [
        {
          "inventory-item-id": "40",
          "quantity": 2
        },
        {
          "inventory-item-id": "41",
          "quantity": 5
        }
      ],
      "shipping": {
        "address-id": "1",
        "drop-off": "2016-06-16 11:34:08..2016-06-16 13:34:08",
        "pick-up": undefined,
        "shipping-method-id": "1"
      },
      "vendor-id": "1"
    }
  };

  assert.deepEqual(order.serializeCustom(), expected);
});
