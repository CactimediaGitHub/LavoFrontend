import Ember from 'ember';
import config from 'lavo-mobile/config/environment';
const {assign, Route, get } = Ember;
import vendorsToMapSources from 'lavo-mobile/utils/vendors-to-map-sources';

const mapLayers = [{
  id: 'symbols',
  type: 'circle',
  source: 'points',
  paint: {
    'circle-color': "#7a88d0"
  }
}];


import {
  ROUTE_VENDOR_SINGLE_MAP,
  ROUTE_MAIN
} from 'lavo-mobile/constants';

export default Route.extend({
  renderTemplate(){
    this.render(ROUTE_VENDOR_SINGLE_MAP, {
      into:ROUTE_MAIN
    })
  },
  model(){
    const { vendor } = this.modelFor('main.vendor');
    const mapOptions = assign({}, config.MAPBOX, {
      zoom: 15,
      center: [
        get(vendor,'lon'),
        get(vendor,'lat')
      ]
    });
    return {
      vendor,
      mapLayers,
      mapOptions,
      mapSources: vendorsToMapSources([ vendor ]),

    }
  },
});
