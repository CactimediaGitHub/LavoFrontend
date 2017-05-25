import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import { ROUTE_INTRO } from 'lavo-mobile/constants';
const { Route, get, RSVP, inject: { service } } = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, {
  model() {
    return RSVP.hash({
      notifications: this.store.query("notification-message", {})
    }).then(({ notifications }) => {
      return RSVP.resolve({
        notificationsCount: get(notifications, 'meta.total-count')
      });
    });
  },
  actions: {
    logout() {
      get(this, 'session').invalidate().then(() => {
        this.transitionTo(ROUTE_INTRO);
      });
    }
  }
});
