import Ember from 'ember';

const { get, set, inject: { service } } = Ember;

export default Ember.Component.extend({
  session:service(),
  classNames: ['ui', 'input'],
  value: 0,
  min: null,
  max: null,
  label: '',

  applyValue(value) {
    const { min, max } = this.getProperties('min', 'max');

    if (!value) {
      this.set('value', null);
      this.sendAction('changed', null);

      return;
    }

    let newValue = value;

    if (min !== null && value <= min) {
      newValue = min;
    }

    if (max !== null && value >= max) {
      newValue = max;
    }

    this.set('value', newValue);
    this.sendAction('changed', newValue);
  },
  actions: {
    onChange({ target }) {
      this.applyValue(target.value);

      target.value = this.get('value');
    },

    onBlur({ target }) {
      this.applyValue(target.value || this.get('min'));

      target.value = this.get('value');
    }
  }
});