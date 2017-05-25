import Ember from 'ember';
import { ROUTE_AUTH_SIGNIN } from 'lavo-mobile/constants';

const { Component } = Ember;

export default Component.extend({
    classNames: ['ui', 'blue', 'blue-circle', 'modal-box'],
    actions: {
      close() {
        this.sendAction('dismiss');
      }
    }
});
