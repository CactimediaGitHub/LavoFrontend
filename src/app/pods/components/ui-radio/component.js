import Ember from 'ember';

const { get, set, computed, Component }  = Ember;

export default Component.extend({
  classNames: ['item'],
  classNameBindings: ['disabled'],

  label: null,
  fullAddress: null,
  value: null,
  groupValue: null,
  disabled: false,
  isUncheckable: null,

  isActive: computed('value', 'groupValue', function() {
    return get(this, 'value') === get(this, 'groupValue');
  }),

  click() {
    const { onChange } = this.attrs;
    const value = get(this, 'value');
    const needReset = get(this, 'isUncheckable') && get(this, 'isActive');

    if (onChange) {
      Ember.deprecate('Use "changed" event instant')
    }

    if (get(this, 'disabled')) {
      return;
    }

    set(this, 'groupValue', needReset ? null : value);

    this.sendAction('changed', get(this,'groupValue'));

    if (onChange) {
      onChange(...arguments);
    }
  }
});
