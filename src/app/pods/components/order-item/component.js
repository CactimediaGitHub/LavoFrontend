import Ember from 'ember';
import moment from 'moment';

const { Component, inject: { service } } = Ember;

export default Component.extend({
  session: service(),
  isNewOrder: false,
  order: null
});
