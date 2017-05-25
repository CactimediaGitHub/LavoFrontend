import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

const { get, Mixin } = Ember;

export default Mixin.create(AuthenticatedRouteMixin, {
  beforeModel() {
    const session = get(this, 'session');

    if (!get(session, 'isSkipped')) {
      return this._super(...arguments);
    }
  }
});
