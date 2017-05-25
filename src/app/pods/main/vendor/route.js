import Ember from 'ember';
import { ROUTE_VENDOR_GALLERY } from 'lavo-mobile/constants';
import LongLoadingMixin from 'lavo-mobile/mixins/long-loading-mixin';

const { get, Route, RSVP } = Ember;

export default Route.extend(LongLoadingMixin, {
  queryParams: {
    modalReviewSuccessSend: {}
  },

  model({ id }) {
    const session = get(this, 'session');
    const customerId = get(this, 'session.currentUser.id');

    return RSVP.hash({
      session,
      vendor: this.store.queryRecordPath('vendor', `/vendors/${id}`, { customer_id: customerId })
    });
  },

  afterModel() {
    this.transitionTo(ROUTE_VENDOR_GALLERY);
  },

  actions: {
    callVendor (number) {
      if(get(this, 'session.isAuthenticated')) {
        window.open(number, '_system')
      } else {
        this.transitionTo({ queryParams: { modalNeedLogin: true } });
      }
    }
  }
});
