import Ember from 'ember';
import {ROUTE_ADMIN_ORDER_SHOW_MAP, ROUTE_ADMIN_ORDER_SHOW, ROUTE_ADMIN_ORDER} from 'lavo-mobile/constants';
import config from 'lavo-mobile/config/environment';

const {get, assign} = Ember;


const mapLayers = [{
  id: 'symbols',
  type: 'circle',
  source: 'points',
  paint: {
    'circle-color': "#7a88d0"
  }
}];

export default Ember.Route.extend({
  renderTemplate(){
    this.render(ROUTE_ADMIN_ORDER_SHOW_MAP, {
      into: ROUTE_ADMIN_ORDER
    })
  },
  model(){
    let {order} = this.modelFor(ROUTE_ADMIN_ORDER_SHOW);
    let address = get(order, 'shipping.address');
    let host = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let accessToken = config.MAPBOX.accessToken;
    let addressUrlPrepared = `${get(address, 'country')}+${get(address, 'city')}+${get(address, 'address1')}`;
    if (get(address, 'address2').trim())
      addressUrlPrepared += `+${get(address, 'address2')}`;
    if (get(address, 'nearestLandmark').trim())
      addressUrlPrepared += `+${get(address, 'nearestLandmark')}`;

    addressUrlPrepared = addressUrlPrepared.replace(/[^a-zA-Z]/g, "+");

    return Ember.RSVP.hash({
      locations: $.getJSON(`${host}${addressUrlPrepared}.json?access_token=${accessToken}`)
    }).then((hash) => {
      let model = {};
      model.locationFound = !!hash.locations.features.length;
      if (model.locationFound) {
        model.mapSources = [
          hash.locations.features[0]

        ];
        model.mapSources = [{
          id: 'points',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [hash.locations.features[0]]
            }
          }
        }];
        model.mapOptions = assign({}, config.MAPBOX, {
          zoom: 11,
          center: [
            hash.locations.features[0].geometry.coordinates[0],
            hash.locations.features[0].geometry.coordinates[1],
          ]
        });
        model.mapLayers = mapLayers;
      }
      return Ember.RSVP.resolve(model);
    });
  }
});
