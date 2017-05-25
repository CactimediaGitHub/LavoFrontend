import Ember from 'ember';
import InfinityRoute from "ember-infinity/mixins/route";
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

export default Ember.Route.extend(InfinityRoute, AuthenticatedGuestRouteMixin, {
  perPageParam: "page[size]",              // instead of "per_page"
  pageParam: "page[number]",                  // instead of "page"
  totalPagesParam: "meta.total-pages",

  model(){
    return this.infinityModel("notification-message", { perPage: 10, startingPage: 1 });
  }
});
