import Ember from 'ember';
import RouteForm from 'lavo-mobile/mixins/route-form-mixin';
import RouteRedirectTo from 'lavo-mobile/mixins/route-redirect-to-mixin';
import { ROUTE_ADDRESS_LIST, ROUTE_ADDRESS_CREATE } from 'lavo-mobile/constants';

const { get, inject: { service }, Route } = Ember;

export default Route.extend(RouteRedirectTo, RouteForm, {
  session: service(),

  redirectToDefault: ROUTE_ADDRESS_LIST,

  model() {
    return this.store.createRecord('address', {
      country: 'AE',
      customer: get(this, 'session.currentUser')
    });
  },

  actions: {
    willTransition() {
      let selfModel = this.modelFor(ROUTE_ADDRESS_CREATE);
      if(selfModel.get('isDeleted') || selfModel.get('isNew')) {
        selfModel.unloadRecord();
      }
    }
  }
});
