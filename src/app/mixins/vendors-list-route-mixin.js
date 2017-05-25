import Ember from 'ember';
import InfinityQueryPathRoute from 'lavo-mobile/mixins/infinity-query-path-route';
import { deserialize as filterDeserialize } from 'lavo-mobile/utils/filter';
import { ROUTE_VENDOR, ROUTE_HOME_INDEX } from 'lavo-mobile/constants';
import GuestRouteMixin from 'lavo-mobile/mixins/guest-route-mixin';

const {set, get, isNone, inject: { service } } = Ember;

export default Ember.Mixin.create(InfinityQueryPathRoute, GuestRouteMixin, {
  queryParams: {
    query: {
      refreshModel: true
    }
  },

  state: service(),

  activate() {
    set(this, 'state.currentRoute', this.routeName);
  },

  model(params, { queryParams: { lat, lon, sort, filter, query } }) {
    if (query) {
      return this.infinityQueryPath('vendor', '/vendor/search', {
        query
      });
    }

    return this.infinityQueryPath('vendor', '/near_vendors', {
      lat,
      lon,
      sort,
      filter: filterDeserialize(filter)
    });
  },

  afterModel(model) {
    let totalCount = get(model, 'meta.total-count');
    set(this, 'state.searchResult', isNone(totalCount) ? null : totalCount);
  },

  actions: {
    willTransition(transition) {
      if (get(transition, "targetName") === ROUTE_HOME_INDEX){
        transition.abort();
      }
      this._super(...arguments);
    },
    goToVendor(id) {
      this.transitionTo(ROUTE_VENDOR, id);
    }
  }
});
