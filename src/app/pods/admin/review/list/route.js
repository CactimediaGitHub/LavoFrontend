import Ember from 'ember';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const { Route, get } = Ember;

export default Route.extend(LongLoadingMixin, {
  model() {
    let id = get(this, 'session.currentUser.id');
    return this.store.queryPath('review', `/vendors/${id}/reviews`);
  }
});
