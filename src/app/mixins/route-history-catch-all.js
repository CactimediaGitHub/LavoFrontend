import Ember from 'ember';

const { get, Mixin } = Ember;

export default Mixin.create({
  create() {
    const route = this._super(...arguments);

    route.on('activate', function() {
      get(this, 'routeHistory').setCurrentRoute(this);
    });

    return route;
  }
});
