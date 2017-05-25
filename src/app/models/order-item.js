import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

const { get, set, computed } = Ember;

export default Model.extend({
  quantity: attr('number', { defaultValue: 0 }),
  order: belongsTo('order'),
  inventoryItem: belongsTo('inventory-item'),

  cpPrice: computed('quantity', function() {
    return get(this, 'quantity') * get(this, 'inventoryItem.price');
  }),

  increaseQuantity() {
    const quantity = get(this, 'quantity') + 1;

    set(this, 'quantity', quantity);
  },

  decreaseQuantity() {
    const quantity = get(this, 'quantity') - 1;

    set(this, 'quantity', quantity > 0 ? quantity : 0);
  },

  makeIntQuantity: Ember.observer('quantity', function() {
    if (get(this, 'quantity'))
      set(this, 'quantity', parseInt(get(this, 'quantity')));
  })
});
