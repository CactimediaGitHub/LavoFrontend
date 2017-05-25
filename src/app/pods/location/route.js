import Ember from 'ember';
import config from 'lavo-mobile/config/environment';
import AuthenticatedGuestRouteMixin from '../../mixins/authenticated-guest-route-mixin';
import { SORT_BY_PROXIMITY, ROUTE_LOCATION, ROUTE_VENDOR_TILES, ROUTE_ADMIN_HOME } from '../../constants';

const {get, set, assign, inject: { service }, Route, run } = Ember;

const [lon, lat] = config.MAPBOX.center;

let defaultCoords = {
  lat,
  lon
};


export default Route.extend(AuthenticatedGuestRouteMixin, {
  geolocation: service(),
  session:service(),
  state:service(),
  beforeModel() {
    if(get(this,'session.isCustomer') || !get(this,'session.isAuthenticated')) {
      const geolocation = get(this, 'geolocation');

      geolocation
        .getLocation()
        .then((coords) => {
          defaultCoords = coords;
        })
        .catch((error) => {
          set(this.controllerFor(ROUTE_LOCATION), 'hasError', true);

          console.log('Geolocation Error: ', error);
        })
        .finally(() => {
          run.later(() => {
            this.transitionTo(get(this, 'state.currentRoute') || ROUTE_VENDOR_TILES, {
              queryParams: assign({
                  sort: SORT_BY_PROXIMITY
                },
                defaultCoords
              )
            });
          }, 1500);
        });
    }else{
      this.transitionTo(ROUTE_ADMIN_HOME);
    }
  }
});
