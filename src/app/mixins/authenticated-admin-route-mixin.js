import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Mixin.create(AuthenticatedRouteMixin, {
  beforeModel() {
    return this._super(...arguments);
  }
});
