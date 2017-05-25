import Ember from 'ember';
import RouteForm from 'lavo-mobile/mixins/route-form-mixin';
import { ROUTE_REVIEWS } from 'lavo-mobile/constants';

const {set, get, Route } = Ember;

export default Route.extend(RouteForm, {
  queryParams: {
    vendorId: {}
  },

  redirectToDefault: ROUTE_REVIEWS,

  model({ vendorId }) {
    const store = this.store;

    return store.createRecord('review', {
      reviewable: store.peekRecord('vendor', vendorId),
      reviewer: get(this, 'session.currentUser'),
    });
  },

  actions: {
    save() {
      if (this.controller.get('model.validations.isValid')) {
        set(this, 'redirectToQueryParams', {
          queryParams: {
            modalReviewSuccessSend: true
          }
        });
      }

      return this._super(...arguments);
    }
  }
});
