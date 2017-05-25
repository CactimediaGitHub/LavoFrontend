import Ember from 'ember';
import DS from 'ember-data';
import {
  ROUTE_ADMIN_ORDER,
  ROUTE_ADMIN_ORDER_SHOW,
  ROUTE_ADMIN_ORDER_LIST_NEW,
  ROUTE_ADMIN_ORDER_UPDATE
} from 'lavo-mobile/constants';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

const { get, set, Route, RSVP, inject: { service }, computed } = Ember;

export default Route.extend( AuthenticatedGuestRouteMixin, {
  ajax: service(),
  state: service(),

  isPositiveQuantity:computed(function(){
    let orderItems = get(this,'controller.model.order.orderItems');
    return orderItems instanceof DS.PromiseManyArray&&
      orderItems.toArray().some((item)=>{
        return get(item,'quantity')>0;
      });
  }).volatile(),

  model(params, { queryParams : { serviceId } }) {
    let { store } = this;
    const { services, inventories, itemTypes } = this.modelFor(ROUTE_ADMIN_ORDER);
    const { order } = this.modelFor(ROUTE_ADMIN_ORDER_UPDATE);
    const vendorId = get(this,'session.currentUser.id');
    const selectedServiceID = get(this, 'state.filterSelectedServiceID');
    const selectedItemTypeID = get(this, 'state.filterSelectedItemTypeID');
    const service = services.find((service)=> {return get(service,'id')== selectedServiceID})||null;
    const type = itemTypes.find((type)=>{return get(type,"id")==selectedItemTypeID}) || null;
    const orderItems = get(order, 'orderItems').filter((orderItem) => {
      let condition = true;

      if(selectedServiceID){
        condition = condition&&get(orderItem,'inventoryItem.service.id')==selectedServiceID;
      }

      if(selectedItemTypeID){
        condition = condition&&get(orderItem,'inventoryItem.itemType.id')==selectedItemTypeID;
      }

      return condition;
    });
    return RSVP.hash({
      order,
      services,
      itemTypes,
      inventories,
    }).then(( { order, services, selectedServiceId, inventories, itemTypes } ) => {
      return RSVP.resolve({
        order,
        services,
        itemTypes,
        inventories,
        orderItems,
        service,
        type
      });
    });
  },


  actions: {
    increase(orderItem) {
      orderItem.increaseQuantity();
    },

    decrease(orderItem) {
      orderItem.decreaseQuantity();
    },

    updateBasket(order) {
      const data = order.serializeCustom();
      const alert = get(this,'dialogWindow.alert');
      if(get(this,'isPositiveQuantity')) {
        delete data.order['vendor-id'];
        get(this, 'ajax')
          .patch(`/openbasket_orders/${get(order, 'id')}`, {data})
          .then(() => {
            get(this, 'store').peekAll('order-item').filterBy('isNew', true).forEach(orderItem => {
              get(this, 'store').unloadRecord(orderItem);
            });
            order.reload();
            this.transitionTo(ROUTE_ADMIN_ORDER_LIST_NEW);
          });
      }else{
        alert('Select at least one item');
      }
    },

  }
});