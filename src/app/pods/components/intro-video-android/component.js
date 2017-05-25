import Ember from 'ember';

const { Component, inject: { service }, on, set } = Ember;

export default Component.extend({
  state: service(),
  classNames: ['ui transparent purple'],
  onDidRender: on('didRender', function () {
    this.$('video').on('ended', () => {
      setTimeout(() => {
        this.destroy();
        set(this, 'state.needVideo', false);
      }, 1000);
    });
  })
});
