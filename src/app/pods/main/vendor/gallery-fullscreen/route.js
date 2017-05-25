import Ember from 'ember';
import { ROUTE_VENDOR } from 'lavo-mobile/constants';

const { get, Route } = Ember;

export default Route.extend({
  model({ id }) {
    const { vendor } = this.modelFor(ROUTE_VENDOR);

    return get(vendor, 'images')[id];
  },
  renderTemplate: function() {
    this.render('main/vendor/gallery-fullscreen', {
      into: 'application'
    })
  }
});
