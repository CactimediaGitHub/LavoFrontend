import Ember from 'ember';
import {
  ROUTE_VENDOR_LIST,
  SORT_BY_PRICE,
  FILTER_BY_VENDOR_SERVICE,
  FILTER_BY_VENDOR_ITEM,
  ROUTE_VENDOR_TILES,
  ROUNTE_HOME_INDEX,
  ROUTE_MAIN_HOME_INDEX
} from 'lavo-mobile/constants';
import GuestRouteMixin from 'lavo-mobile/mixins/guest-route-mixin';

import * as FilterUtil from 'lavo-mobile/utils/filter';

const { get, inject: { service }, Route, RSVP, A } = Ember;

export default Route.extend( GuestRouteMixin, {
  state: service(),
  renderTemplate: function() {
    this.render('main/home/filter-price', {
      into: 'main'
    })
  },
  model(params, { queryParams : { filter } }) {
    const result = FilterUtil.deserialize(filter);

    return RSVP.hash({
      sort: SORT_BY_PRICE,
      routeName: get(this, 'state.currentRoute') || ROUTE_VENDOR_LIST,
      items: this.store.queryPath('item', '/catalog/items'),
      services: this.store.queryPath('service', '/catalog/services'),
      selectedItemId: result[FILTER_BY_VENDOR_ITEM] || A(),
      selectedServiceId: result[FILTER_BY_VENDOR_SERVICE] || null,
      selectedServiceIds: result[FILTER_BY_VENDOR_SERVICE] || null
    });
  },

  actions: {
    applyFilters(params) {
      
      const filters = [];
      
      const { selectedServiceId, selectedItemId, selectedServiceIds } = params;

      if (selectedServiceIds.length) {
        filters.push(`${FILTER_BY_VENDOR_SERVICE}=${selectedServiceIds.join('-')}`);
      }

      if (selectedItemId.length) {
        filters.push(`${FILTER_BY_VENDOR_ITEM}=${selectedItemId.join('-')}`);
      }

      this.transitionTo(params.routeName, {
        queryParams: {
          sort: params.sort,
          filter: FilterUtil.serialize(filters)
        }
      });
    },
    willTransition({targetName}){

      if ( targetName === ROUTE_MAIN_HOME_INDEX) {
        this.transitionTo(get(this,'state.currentRoute') || ROUTE_VENDOR_TILES);
      }
    }
  }
});
