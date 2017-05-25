import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

const { Route, RSVP, get } = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, {
  model() {
    return RSVP.hash({
      model: this.get('session.currentUser'),
      notifications: this.store.query("notification-message", {})
    }).then(({model, notifications}) => {
      return RSVP.resolve({
        model,
        notificationsCount: get(notifications, 'meta.total-count')
      });
    });
  }
});
