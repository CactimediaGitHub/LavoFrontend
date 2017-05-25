import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['ui transparent purple modal-box'],

  actions: {
    close() {
      this.sendAction('dismiss');
    }
  }
});
