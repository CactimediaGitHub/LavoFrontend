import Ember from 'ember';
import RouteHistoryMixin from 'ember-route-history/services/route-history';

export default RouteHistoryMixin.extend({
  setCurrentRoute(route) {
    this.addRouteToHistory(document.URL);
  },

  previous: Ember.computed('history.[]', function() {
    const history = this.get('history');
    const historyLength = history.get('length');
    if (!Ember.isEmpty(history) && historyLength > 1) {
      return history.objectAt(historyLength - 1);
    }

    return null;
  })
});
