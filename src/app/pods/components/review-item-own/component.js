import Ember from 'ember';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['ui', 'card', 'smallest'],
  session: service(),
  review: null
});
