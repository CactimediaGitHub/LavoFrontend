import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  classNames: ['ui info card login'],
  
  actions: {
    close() {
      this.destroy();
    }
  }
});
