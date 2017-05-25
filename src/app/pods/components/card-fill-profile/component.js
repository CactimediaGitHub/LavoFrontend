import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['ui info card fill-profile'],

  actions: {
    close() {
      this.destroy();
    }
  }
});
