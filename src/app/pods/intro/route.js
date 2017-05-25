import Ember from 'ember';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';
import { ROUTE_HOME } from 'lavo-mobile/constants';

const { get, set, inject: { service }, Route,uuid } = Ember;

export default Route.extend(UnauthenticatedRouteMixin, {
  network: service(),
  session: service(),
  state: service(),
  setupController(controller) {
    controller.set('fbLoading',false);
    controller.set('state', get(this, 'state'));
    controller.set('platform', get(window,'cordova.platformId') || 'android');
  },
  actions: {
    facebookSignIn() {
      if (get(this, 'network.isOffline')) {
        return this.transitionTo({ queryParams: { modalConnection: uuid() } });
      }
      const session = get(this, 'session');
      set(this, 'controller.fbLoading', true)
      session
        .authenticate('authenticator:facebook')
        .then(() => {
          this.transitionTo(ROUTE_HOME);
        }).catch(() => {
          set(this, 'controller.fbLoading', false);
      });
    },

    willTransition(transition) {
      const session = get(this, 'session');
      transition.promise.then(() => {
        set(this, 'controller.fbLoading', false);
      });
      if (transition.queryParams.isSkipped) {
        set(session, 'isSkipped', true);
      }

      return true;
    }
  }
});
