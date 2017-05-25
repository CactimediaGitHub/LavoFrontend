import Ember from 'ember';

const { Component } = Ember;

const { computed } = Ember;

const CITIES = [
  { name: 'AbuDhabi', value: 'AbuDhabi' },
  { name: 'Dubai', value: 'Dubai' },
  { name: 'Sharjah', value: 'Sharjah' },
  { name: 'Ajman', value: 'Ajman' },
  { name: 'Umm al-Quwain', value: 'Umm al-Quwain' },
  { name: 'Fujairah', value: 'Fujairah' },
  { name: 'Ras al-Khaimah', value: 'Ras al-Khaimah' }
]

export default Component.extend({
  CITIES,
  currentValue: computed(function() {
    return this.get(`model.${this.valuePath}`);
  }),
  actions: {
    setValue(value) {
      this.set(`model.${this.valuePath}`, value);
    }
  }
});
