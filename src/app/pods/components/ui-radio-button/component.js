import Ember from 'ember';
import UIRadio from '../ui-radio/component';

const { get, set }  = Ember;

export default UIRadio.extend({
  classNameBindings: ['isActive:active'],

  click() {
    let value = get(this, 'value');
    if (get(this, 'isActive')) {
      value = null;
    }

    set(this, 'groupValue', value);
  }
});
