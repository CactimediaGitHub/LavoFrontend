import Ember from 'ember';
import { ORDER_STATUS_PENDING } from 'lavo-mobile/constants';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

const { get, Route, RSVP } = Ember;

const path = '/vendor/orders';

const getTotalCount = (model) => {
  return get(model, 'meta.total-count') || 0;
};

export default Route.extend( AuthenticatedGuestRouteMixin, {
  model() {
    let { id, type } = this.get('session.data.authenticated.data');

    return RSVP.hash({
      newOrders: this.store.queryPath('order', path, {
        filter: {
          state: [
            ORDER_STATUS_PENDING
          ]
        },
      }),

      newReviews: this.store.queryPath('review', `/${type}/${id}/reviews`),
      notifications: this.store.query("notification-message", {}),
    }).then(({ newOrders, newReviews, notifications }) => {
      return {
        newOrdersCount: getTotalCount(newOrders),
        newReviewsCount: newReviews.filterBy('commentsCount', 0).length,
        notificationsCount: get(notifications, 'meta.total-count'),
      };
    });
  },

  setupController(controller, model) {
    this._super(...arguments);
    controller.setProperties(model);
  }
});
