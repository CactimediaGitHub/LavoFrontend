import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const { Route, get } = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, LongLoadingMixin, {
  model() {
    let id = get(this, 'session.currentUser.id');
    return this.store.queryPath('review', `/customers/${id}/reviews`);
  }
})
