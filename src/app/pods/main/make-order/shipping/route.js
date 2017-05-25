import Ember from 'ember';
import {
  ROUTE_MAKE_ORDER,
  ROUTE_MAKE_ORDER_CHECKOUT
} from 'lavo-mobile/constants';

const {get, set, Route, RSVP,inject: { service } } = Ember;

const validateShippingDate = ([date, period]) => {
  return (date && period);
};

export default Route.extend({
  session:service(),
  model() {
    const { order } = this.modelFor(ROUTE_MAKE_ORDER);
    const shipping = get(order, 'shipping');
    return RSVP.hash({
      addresses: get(this,'session.currentUser.addresses'),
      schedules: this.store.queryPath('schedule', `/vendors/${get(order, 'vendor.id')}/schedule`)
    }).then(({ addresses, schedules }) => {
      const address = addresses.objectAt(0);

      if (address) {
        set(shipping, 'address', address);
      }
      return RSVP.resolve({
        order,
        shipping,
        addresses,
        schedules,
        selectedAddressId: address ? get(address, 'id') : null
      });
    });
  },

  setupController(controller, model) {
    controller.setProperties({ model });
    if (!get(controller, 'controllerSelectedAddressId')) {
      controller.set('controllerSelectedAddressId', get(model, 'selectedAddressId'));
    }
  },

  actions: {
    selectAddress(shipping, address) {
      set(shipping, 'address', address);
    },

    selectPickUp(shipping, date, period) {
      set(shipping, 'pickUp', [date, period]);
    },

    selectDropOff(shipping, date, period) {
      set(shipping, 'dropOff', [date, period]);
    },

    willTransition(transition) {
      const { order } = this.modelFor(ROUTE_MAKE_ORDER);
      const alert = get(this, 'dialogWindow.alert');
      //@TODO: Move some logic to model validation
      if (transition.targetName === ROUTE_MAKE_ORDER_CHECKOUT &&
        !get(order, 'shipping.validations.isValid')) {
        let error = '';
        if (!get(order, 'shipping.validations.attrs.pickUp.isValid')||
            !get(order, 'shipping.validations.attrs.dropOff.isValid')) {
          error += 'Check for pick up and drop off time ranges.\n';
        }
        if (!get(order, 'shipping.validations.attrs.address.isValid')) {
          error += 'You have not selected an address.'
        }
        alert(error);
        transition.abort();
      }
      return true;

    },
    removeAddress(model, address) {
      const confirm = get(this, 'dialogWindow.confirm');
      confirm(`Do you want to remove address "${get(address, 'humanName')}"?`).then((answer) => {
        if(answer){
          address.destroyRecord();
        }
      })
    }
  }
});
