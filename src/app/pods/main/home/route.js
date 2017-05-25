import Ember from 'ember';
import {
  ROUTE_LOCATION,
  ROUTE_VENDOR_TILES,
  ROUTE_ADMIN_HOME,
  ROUTE_VENDOR_MAP,
  ROUTE_HOME_INDEX,
  ROUTE_VENDOR_GALLERY
} from 'lavo-mobile/constants';
import config from 'lavo-mobile/config/environment';
import parseGeocodingResponse from 'lavo-mobile/utils/parse-geocoding-response';

const {get, set, run, inject: {service}, Route, RSVP, TargetActionSupport, computed} = Ember;

export default Route.extend({
  state: service(),
  session: service(),
  geolocation: service(),
  ajax: service(),

  queryParams: {
    lat: {
      refreshModel: true
    },
    lon: {
      refreshModel: true
    },
    sort: {
      refreshModel: true
    },
    filter: {
      refreshModel: true
    }
  },

  beforeModel({queryParams: {lat, lon}, targetName}) {

    if (!get(this, 'session.isCustomer') && get(this, 'session.isAuthenticated')) {

      this.transitionTo(ROUTE_ADMIN_HOME);
    }


    if (!(lat && lon)) {

      this.transitionTo(ROUTE_LOCATION);
    }


    // Redirect to default vendors view route if not set
    if (!!~targetName.indexOf('index')) {
      this.transitionTo(get(this, 'state.currentRoute') || ROUTE_VENDOR_TILES);
    }
  },

  model({query}) {
    const state = get(this, 'state');

    if (!get(state, 'isSearchEnabled')) {
      this.applyQuery(undefined);
    }

    return RSVP.resolve({
      notifications: get(this, 'session.isAuthenticated') && this.store.query("notification-message", {}),
      state,
      locality: get(this, 'ajax').request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${get(this, 'geolocation.lat')},${get(this, 'geolocation.lon')}&key=${config.googleMap.apiKey}&language=${config.googleMap.language}`),
      lastOrder: get(this, 'session.isAuthenticated') ? this.store.queryRecordPath('order', '/customer/last_order') : null,
      session: get(this, 'session')
    });

  },

  setupController(controller, model) {
    controller.set('model', model);
    const localityResult = get(model, 'locality._result');
    if (localityResult && get(localityResult, 'status') === 'OK') {
      controller.set('locality', parseGeocodingResponse(localityResult));
    }
  },

  deactivate() {
    set(this, 'state.isSearchEnabled', false);
  },

  applyQuery(query) {
    this.transitionTo({queryParams: {query}});
  },

  actions: {
    toggleSearch() {
      const state = get(this, 'state');
      state.toggleProperty('isSearchEnabled');

      set(this, 'currentModel.query', '');
      this.applyQuery(undefined);
    },

    search(value) {
      if (this.controllerFor('application').get('currentRouteName') === ROUTE_VENDOR_MAP) {
        run(this, 'applyQuery', value)
      } else {
        run.debounce(this, 'applyQuery', value, 700);
      }
    },

    goToVendor(id) {
      this.transitionTo(ROUTE_VENDOR_GALLERY, id);
    }
  }
});
