import Ember from 'ember';
import InfinityQueryPathRoute from 'lavo-mobile/mixins/infinity-query-path-route';

const { RSVP, Route } = Ember;

export default Route.extend(InfinityQueryPathRoute, {
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  _modelPath: 'controller.model.promotions',

  model({ page }) {
    return RSVP.hash({
      promotions: this.infinityQueryPath('promotion', '/promotions')
    });
  },

  actions: {
    requestPromotions(page) {
      this.transitionTo({ queryParams: { page } });
    }
  }
});
