import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['ui', 'blue', 'blue-circle', 'modal-box','order-cancel'],

  actions: {
    close() {
      this.sendAction('dismiss');
    },
  }
});
