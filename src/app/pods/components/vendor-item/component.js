import Ember from 'ember';
import { FIXTURE_IMAGE } from 'lavo-mobile/constants';
const { Component, computed, Handlebars: { SafeString } } = Ember;

export default Component.extend({
  classNames: ['item'],
  attributeBindings: ['style'],

  vendor: null,
  vendorImage: computed('avatar', function() {
    return `${this.get('vendor').getAvatar() || FIXTURE_IMAGE}`;
  }),

  click() {
    if (this.attrs.onClick) {
      this.attrs.onClick();
    }
  }
});
