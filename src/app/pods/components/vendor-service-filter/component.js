import Ember from 'ember';

const { get, set, computed, Component }  = Ember;

export default Component.extend({
  classNames: ['item'],
  
  label: null,
  value: null,
  groupValue: [],

  isActive: computed('value', 'groupValue', function() {
    return get(this, 'groupValue').indexOf(get(this, 'value')) + 1;
  }),

  click () {
    const { onChange } = this.attrs;
    const value = get(this, 'value');
    set(this, 'isActive', get(this, 'isActive') ? false : true);
    const needReset = get(this, 'isActive');

    if (onChange) {
      Ember.deprecate('Use "changed" event instant')
    }

    if (needReset) {
      let serviceIds = get(this, 'groupValue');
      serviceIds.push(get(this, 'value'));
      set(this, 'groupValue', serviceIds);
    } else {
      let serviceIds = get(this, 'groupValue');
      for (var i = 0; i < serviceIds.length; i++) {
        if (serviceIds[i] === get(this, 'value')) {
          serviceIds.splice(i, 1);
          break;
        }
      }
    }

    this.sendAction('changed', get(this,'groupValue'));

    if (onChange) {
      onChange(...arguments);
    }
  }
});
