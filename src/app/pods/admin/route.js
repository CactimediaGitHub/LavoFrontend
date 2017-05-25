import Ember from 'ember';
import { ROUTE_MAIN } from 'lavo-mobile/constants';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import FetchUserInfoMixin from 'lavo-mobile/mixins/fetch-user-info';

const { Route, get } = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, FetchUserInfoMixin,{
  actions: {
    logout() {
      this.get('session').invalidate().then(() => {
        this.transitionTo(ROUTE_MAIN);
      });
    }
  }

});
