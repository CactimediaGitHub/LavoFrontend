import Ember from 'ember';

const { Component, inject: { service }, on, set } = Ember;

export default Component.extend({
  state: service(),
  classNames: ['ui transparent purple'],
  onDidRender: on('didRender', function() {
    setTimeout(() => {
      this.destroy();
      set(this, 'state.needVideo', false);
    }, 5500);
  }),
});
