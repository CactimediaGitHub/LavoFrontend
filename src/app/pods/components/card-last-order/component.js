import Ember from 'ember';

const { Component, get } = Ember;

export default Component.extend({
  classNames: ['ui info card login'],

  actions: {
    close() {
      this.destroy();
    }
  },

  click() {
    this.sendAction('goToVendor', get(this, 'lastOrder.vendor.id'))
  }
});
