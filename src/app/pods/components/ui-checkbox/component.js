import Ember from 'ember';
import UIRadio from '../ui-radio/component';

const { get, set, computed }  = Ember;

export default UIRadio.extend({
  classNameBindings: ['isActive:active'],

  isActive: computed('value', 'groupValue.length', function() {
    return get(this, 'groupValue').indexOf(get(this, 'value')) + 1;
  }),

  click() {
    let value = get(this, 'value');
    let groupValue = get(this, 'groupValue');
    if (get(this, 'isActive')) {
      groupValue.removeObject(value);
    } else {
      groupValue.addObject(value);
    }

    set(this, 'groupValue', groupValue);
  }
});
