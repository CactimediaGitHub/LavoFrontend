import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import { MAKE_OPEN_BASKET_TRANSITION_EXCEPTIONS,
  ROUTE_OPEN_BASKET_DELIVERY,
  DELIVERY_PERIOD_DEFAULT,ROUTE_OPEN_BASKET,
  ROUTE_SETTINGS_PROFILE
} from 'lavo-mobile/constants';
const { get, set, RSVP } = Ember;

export default Ember.Route.extend(AuthenticatedGuestRouteMixin, {
  recordsShouldBeDestroyed: false,

  model({ vendorId }) {
    const { store } = this;
    const customer = get(this,'session.currentUser');
    let previousModel = this.modelFor(ROUTE_OPEN_BASKET);
    let order = previousModel && get(previousModel,'order') || null;

    return RSVP.hash({
      vendor: store.peekRecord('vendor', vendorId) || store.findRecord('vendor', vendorId),
      customer: get(this, 'session.currentUser'),
    }).then(({ vendor, customer }) => {

      if(!order || get(order, 'isDeleted')) {
        const shipping = store.createRecord('shipping');
        order = store.createRecord('order');
        order.setProperties({
          vendor,
          shipping,
          customer,
          openbasket: true
        });
      }

      return RSVP.resolve({
        order,
        customer,
        vendorId: get(vendor, 'id'),
      });
    });
  },

  afterModel(model) {
    const customer = get(this, 'session.currentUser');
    const vendorId = get(model, 'vendor.id');
    const routeName = get(this, 'routeName');
    const { addresses, phone } = customer.getProperties('addresses', 'phone');

    if(!get(addresses, 'length') || !phone) {
      this.transitionTo(ROUTE_SETTINGS_PROFILE, {
        queryParams: {
          redirectTo: routeName,
          vendorId
        }
      });
    }
  },

  deactivate(){
    this._super();

    if(get(this, 'recordsShouldBeDestroyed')){
      const deliveryModel = this.modelFor(ROUTE_OPEN_BASKET_DELIVERY);

      get(this, 'controller.model.order').destroyRecord();
      set(this, 'controller.model.order', null);

      deliveryModel && set(deliveryModel, 'selectedMethodId', null);
      set(this, 'recordsShouldBeDestroyed', false);
    }
  },

  actions: {

    willTransition(transition) {

      if (!(new RegExp(MAKE_OPEN_BASKET_TRANSITION_EXCEPTIONS)).test(transition.targetName)) {
        set(this, 'recordsShouldBeDestroyed', true);
      }
    },

  }
});