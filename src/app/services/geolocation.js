import Ember from 'ember';

const { set, run, Service, RSVP } = Ember;


export default Service.extend({
  hasLocation: null,
  lat: 24.976112,
  lon: 55.17937,

  getLocation() {
    const defer = RSVP.defer();
    const { resolve, reject } = defer;

    const timer = run.later(() => {
      set(this, 'hasLocation', false);
      run.later(null, reject, 'Timeout');
    }, 15000);

    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        run.cancel(timer);

        set(this, 'hasLocation', true);
        set(this, 'lat', pos.coords.latitude);
        set(this, 'lon', pos.coords.longitude);

        run.later(null, resolve, {
          lat: pos.coords.latitude,
          lon: pos.coords.longitude
        });
      },
      (error) => {
        run.later(null, reject, error);
      }
    );

    return defer.promise;
  }
});
