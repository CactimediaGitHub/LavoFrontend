import Ember from 'ember';

const { Component } = Ember;

const { computed } = Ember;

const PREFIX_NUMBERS = ['050', '052', '055', '056'];

export default Component.extend({
  PREFIX_NUMBERS,
  currentPrefixPhoneValue: computed(function() {
    return this.get(`model.${this.prefixPhoneValuePath}`);
  }),
  currentPhoneValue: computed(function() {
    return this.get(`model.${this.phoneValuePath}`);
  }),
  actions: {
    setPrefixPhoneValue(value) {
      this.set(`model.${this.prefixPhoneValuePath}`, value);
    }
  }
});
