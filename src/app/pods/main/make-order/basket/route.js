import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import {
  ROUTE_MAKE_ORDER_BASKET,
  ROUTE_VENDOR_GALLERY,
  ROUTE_MAKE_ORDER,
  ROUTE_SETTINGS_PROFILE,
  ROUTE_MAKE_ORDER_DELIVERY
} from 'lavo-mobile/constants';

const { get, Route, RSVP, inject: { service } } = Ember;

export default Route.extend(AuthenticatedGuestRouteMixin, {
  session: service(),
  state: service(),

  model(params, { queryParams : { serviceId } }) {
    const { services, order, itemTypes } = this.modelFor(ROUTE_MAKE_ORDER);
    const selectedServiceID = get(this, 'state.filterSelectedServiceID');
    const selectedServiceIDs = get(this, 'state.filterSelectedServiceIDs');
    const selectedItemTypeID = get(this, 'state.filterSelectedItemTypeID');
    const orderItems = get(order, 'orderItems').filter((orderItem) => {
      let condition = true;
      if(selectedServiceIDs.length){
        const isServiceMatchs = selectedServiceIDs.indexOf(get(orderItem,'inventoryItem.service.id')) >= 0 ? true : false;
        condition = condition&&isServiceMatchs;
      }

      if(selectedItemTypeID){
        condition = condition&&get(orderItem,'inventoryItem.itemType.id')==selectedItemTypeID;
      }

      return condition;
    });
    const service = services.find((service)=> {return (selectedServiceIDs.indexOf(get(service,'id')) >= 0 ? true : false);})||null;
    const type = itemTypes.find((type)=>{return get(type,"id")==selectedItemTypeID}) || null;
    return RSVP.resolve({
      order,
      services,
      orderItems,
      service,
      type,
    });
  },

  afterModel(model) {
    const customer = get(this, 'session.currentUser');
    const { vendorId } = this.modelFor(ROUTE_MAKE_ORDER);

    const { addresses, phone } = customer.getProperties('addresses', 'phone');
    const routeName = get(this, 'routeName');
    if(!get(addresses, 'length') || !phone) {
      this.transitionTo(ROUTE_SETTINGS_PROFILE, {
        queryParams: {
          redirectTo: routeName,
          vendorId
        }
      });
    }
  },

  actions: {
    increase(orderItem) {
      orderItem.increaseQuantity();
    },

    decrease(orderItem) {
      orderItem.decreaseQuantity();
    },

    willTransition(transition) {
      const { order } = this.modelFor(ROUTE_MAKE_ORDER);
      const alert = get(this, 'dialogWindow.alert');
      const { selectedServiceId } = this.get('currentModel');

      //@TODO: Move some logic to model validation
      if (transition.targetName === ROUTE_MAKE_ORDER_DELIVERY && get(order, 'cpQuantity') === 0) {
        transition.abort();
        alert('Can\'t make an order with the empty basket');
      } else if ([ROUTE_MAKE_ORDER_BASKET, ROUTE_MAKE_ORDER].indexOf(transition.targetName) !== -1 ) {
        if(transition.targetName === ROUTE_MAKE_ORDER_BASKET && get(transition, 'queryParams.serviceId') && get(transition, 'queryParams.serviceId') !== selectedServiceId) {
          return true;
        }
        transition.abort();
        const { order } = this.modelFor(ROUTE_MAKE_ORDER);
        this.transitionTo(ROUTE_VENDOR_GALLERY, order.get('vendor.id'))
      }
      return true;
    }
  }
});
