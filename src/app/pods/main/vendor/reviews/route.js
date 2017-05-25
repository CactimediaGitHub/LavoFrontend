import Ember from 'ember';
import GuestRouteMixin from 'lavo-mobile/mixins/guest-route-mixin';
import {ROUTE_VENDOR} from 'lavo-mobile/constants';

const { get, Route } = Ember;

export default Route.extend(GuestRouteMixin, {
  model() {
    const { vendor } = this.modelFor(ROUTE_VENDOR);

    return this.store.queryPath('review', `/vendors/${get(vendor, 'id')}/reviews`);
  }
});
