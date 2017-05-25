import Ember from 'ember';
import moment from 'moment';
import {isUnauthorizedError} from 'ember-ajax/errors';
import config from 'lavo-mobile/config/environment';
import {ROUTE_AUTH_SIGNIN} from 'lavo-mobile/constants';
// Set default format for moment
moment.defaultFormat = config.moment.outputFormat;

const { get, inject: { service }, uuid, Route, RSVP, run } = Ember;

export default Route.extend({
  network: service(),
  session:service(),
  state:service(),
  queryParams: {
    modalConnection: {},
    modalNeedLogin: {}
  },
  actions: {
    error(error) {
      // Show modal if no internet connection
      if (get(this, 'network.isOffline')) {
        return this.transitionTo({ queryParams: { modalConnection: uuid() } });
      }

      if (isUnauthorizedError(error)) {
        this.transitionTo(ROUTE_AUTH_SIGNIN);
      }

      throw error;
    }
  },
  setupController(controller){
    let platform = get(window,'cordova.platformId');
    controller.set('platform',platform);
    controller.set('state',this.get('state'));
  }
});
