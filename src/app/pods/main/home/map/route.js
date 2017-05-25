import Ember from 'ember';
import config from 'lavo-mobile/config/environment';
import GuestRouteMixin from 'lavo-mobile/mixins/guest-route-mixin';
import {ROUTE_VENDOR,MARKER, ROUTE_HOME, ROUTE_VENDOR_MAP, ROUTE_HOME_INDEX, FIXTURE_IMAGE} from 'lavo-mobile/constants';
import vendorsToMapSources from 'lavo-mobile/utils/vendors-to-map-sources';
import parseGeocodingResponse from 'lavo-mobile/utils/parse-geocoding-response';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const MapboxGL = window.mapboxgl;
const {get, set, inject: {service}, run, assign, Route, RSVP} = Ember;

const mapLayers = [{
  id: 'symbols',
  type: 'circle',
  source: 'points',
  paint: {
    'circle-color': "#7a88d0"
  }
}];


let popupCache = [];

export default Route.extend(GuestRouteMixin, {
  queryParams: {
    coordsNE: {
      refreshModel: true
    },
    coordsNW: {
      refreshModel: true
    },
    coordsSE: {
      refreshModel: true
    },
    coordsSW: {
      refreshModel: true
    },
    query: {
      refreshModel: false
    }
  },
  geolocation: service(),
  state: service(),
  ajax: service(),

  activate() {
    set(this, 'state.isPending', true);
    set(this, 'state.currentRoute', this.routeName);
  },

  model(params, {queryParams}) {
    let vendors = [];

    let {query} = this.modelFor(ROUTE_HOME);

    let mapOptions = assign({}, config.MAPBOX, {
      zoom:11,
      center: [
        queryParams.lon,
        queryParams.lat
      ]
    });

    mapOptions.zoom = queryParams.zoom || mapOptions.zoom

    if (params.coordsNE) {
      vendors = this.store.queryPath('vendor', '/near_vendors/map', {
        ne: params.coordsNE,
        nw: params.coordsNW,
        se: params.coordsSE,
        sw: params.coordsSW
      });
    }

    return RSVP.hash({
      vendors: null,
      unfilteredVendors: vendors,
      locality: get(this, 'ajax').request(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${queryParams.lat},${queryParams.lon}&key=${config.googleMap.apiKey}&language=${config.googleMap.language}`),
    }).then((hash) => {
      const homeController = this.controllerFor(ROUTE_HOME);
      homeController.set('locality', parseGeocodingResponse(hash.locality));
      hash.mapOptions = mapOptions;
      hash.mapSources = vendorsToMapSources(hash.unfilteredVendors);
      hash.mapLayers = mapLayers;
      hash.vendors = hash.unfilteredVendors.filter((vendor) => {
        if (queryParams.query) {
          return get(vendor, 'name').indexOf(queryParams.query) + 1 || get(vendor, 'address').indexOf(queryParams.query) + 1;
        }
        return true;
      });

      return RSVP.resolve(hash);
    });
  },

  updateLocations(map) {
    const bounds = map.getBounds();
    const ne = bounds.getNorthEast();
    const nw = bounds.getNorthWest();
    const se = bounds.getSouthEast();
    const sw = bounds.getSouthWest();

    const latLng = map.getCenter();

    this.transitionTo({
      queryParams: {
        coordsNE: `${ne.lat} ${ne.lng}`,
        coordsNW: `${nw.lat} ${nw.lng}`,
        coordsSE: `${se.lat} ${se.lng}`,
        coordsSW: `${sw.lat} ${sw.lng}`,
        lon: latLng.lng,
        lat: latLng.lat,
      }
    });
  },

  addPopups(map, vendors) {
    vendors.forEach((vendor) => {
      //@TODO: Move this to component???
      let tpl;
      if (vendor.get('cachedAverageRating')) {
        tpl = `
        <div class='ui map-marker'>
          <div class="photo">
            <img src="${vendor.getAvatar() || FIXTURE_IMAGE}"></div>
          <div class="ui violet counter">${vendor.get('cachedAverageRating')}</div>
        </div>
      `;
      } else {
        tpl = `
        <div class='ui map-marker'>
          <div class="photo">
            <img src="${vendor.getAvatar() || FIXTURE_IMAGE}">
          </div>
        </div>
      `;
      }

      // let markerContainer = document.createElement('div');
      // markerContainer.id = `vendor-${vendor.get('id')}`;
      // markerContainer.innerHTML = tpl;
    
      // create the popup
      // let markerPopup = new MapboxGL.Popup({offset: 25})
      //   .setText(`Name : ${vendor.get('name')}, Address : ${vendor.get('address')}, Rating : ${vendor.get('cachedAverageRating')}`);

      // create the marker
      // new MapboxGL.Marker(markerContainer, {offset:[-25, -25]})
      //   .setLngLat([get(vendor, 'lon'), get(vendor, 'lat')])
      //   .setPopup(markerPopup) // sets a popup on this marker
      //   .addTo(map)

      const coords = new MapboxGL.LngLat(get(vendor, 'lon'), get(vendor, 'lat'));
      const popup = new MapboxGL.Popup({
        anchor: 'top',
        closeButton: false,
        closeOnClick: false
      })
        .setLngLat(coords)
        .setHTML(tpl)
        .addTo(map);

      popupCache.push(popup);
    });
  },
  afterModel(model) {
    set(this, 'state.searchResult', get(model, 'meta.total-count') || null);
  },
  removePopups() {
    popupCache.forEach((popup) => {
      popup.remove();
    });
  },

  actions: {
    willTransition(transition) {
      if (get(transition, "targetName") === ROUTE_HOME_INDEX)
        transition.abort();
      this._super(...arguments);
    },
    queryParamsDidChange(changed) {
      let mdl = this.modelFor(ROUTE_VENDOR_MAP);
      if (mdl) {
        let {unfilteredVendors} = mdl;
        if (typeof changed['query'] !== 'undefined' && get(unfilteredVendors, 'length')) {
          set(mdl, 'mapSources', mapSources(unfilteredVendors.filter((vendor) => {
            return get(vendor, 'name').toLowerCase().indexOf(changed['query'].toLowerCase()) + 1 || get(vendor, 'address').toLowerCase().indexOf(changed['query'].toLowerCase()) + 1;
          })));
        } else {
          this.refresh();
        }
      }
    },

    onMapLoad(map) {
      set(this, 'state.isPending', false);
      const geolocation = get(this, 'geolocation');
      geolocation.getLocation().then((coords)=> {
        let tpl = `<div class="ui map-marker me">
                      <img src="${MARKER}" alt="">
                    </div>`;
        const popup = new MapboxGL.Popup({
          anchor: 'top',
          closeButton: false,
          closeOnClick: false
        })
          .setLngLat([coords.lon, coords.lat])
          .setHTML(tpl)
          .addTo(map);
      })
      this.updateLocations(map);
    },

    onMapMove(map) {
      run.debounce(this, this.updateLocations, map, 150);
    },

    onMapClicked(map, event) {
      const features = map.queryRenderedFeatures(event.point, {layers: ['symbols']});
      if (features.length) {
        const [entry] = features;
        const {id} = entry.properties;

        this.transitionTo(ROUTE_VENDOR, id);
      }
    },

    onMapSourcesAdded(map) {
      this.removePopups();

      if (map.getZoom() >= config.MAPBOX.zoom) {
        this.addPopups(map, get(this, 'currentModel.vendors'));
      }
    }
  }
});
