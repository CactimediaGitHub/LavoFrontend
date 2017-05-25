import Ember from 'ember';
import {
  ROUTE_VENDOR_LIST,
  SORT_BY_RATING,
  ROUTE_VENDOR_FILTER_PRICE,
  ROUTE_HOME_INDEX,
  ROUTE_VENDOR_TILES
} from 'lavo-mobile/constants';
import GuestRouteMixin from 'lavo-mobile/mixins/guest-route-mixin';

const {get, set, inject: { service }, Route} = Ember;

export default Route.extend(GuestRouteMixin, {
  state: service(),
  renderTemplate: function() {
    this.render('main/home/filter', {
      into: 'main'
    })
  },
  model(params, {queryParams}) {
    return {
      filter: get(queryParams, 'filter'),
      sort: get(queryParams, 'sort') || SORT_BY_RATING,
      routeName: get(this, 'state.currentRoute') || ROUTE_VENDOR_LIST
    };
  },

  actions: {
    applyFilters(params) {
      set(this, 'state.currentRoute', params.routeName);
      this.transitionTo(params.routeName, {
        queryParams: {
          sort: get(params, 'sort'),
          filter: get(params, 'sort') === 'inventory_items.price' ? get(this, 'currentModel.filter') : undefined
        }
      });
    },
    willTransition({targetName}){

      if (targetName === ROUTE_HOME_INDEX) {
        this.transitionTo(get(this, 'state.currentRoute') || ROUTE_VENDOR_TILES);
      }

      if (targetName === ROUTE_VENDOR_FILTER_PRICE) {
        set(this, 'state.currentRoute', get(this, 'controller.model.routeName'));
      }
    },

  }
});
