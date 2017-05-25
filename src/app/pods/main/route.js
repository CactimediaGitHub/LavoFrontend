import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import FetchUserInfoMixin from 'lavo-mobile/mixins/fetch-user-info';

const { get, Route, inject: { service } } = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, FetchUserInfoMixin, {
  model() {
    return get(this, 'session');
  },
});
