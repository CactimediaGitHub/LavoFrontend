import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';
import { MAKE_ORDER_TRANSITION_EXCEPTIONS, ROUTE_MAKE_ORDER, ROUTE_MAKE_ORDER_DELIVERY } from 'lavo-mobile/constants';

const {get, set, inject: { service }, Route, RSVP } = Ember;
export default Route.extend(AuthenticatedGuestRouteMixin, {
  recordShouldBeDestroyed:false,
  session: service(),
  model({ vendorId }) {
    const { store } = this;
    const customer = get(this, 'session.currentUser');
    const inventoriesPath = `/vendors/${vendorId}/inventory_items`;
    const orders = store.peekAll('order');
    let previousModel = this.modelFor(ROUTE_MAKE_ORDER);
    let order = previousModel && get(previousModel,'order') || null;
    return RSVP.hash({
      vendor: store.peekRecord('vendor', vendorId) || store.findRecord('vendor', vendorId),
      items: store.queryPath('service', `${inventoriesPath}/items`),
      services: store.queryPath('service', `${inventoriesPath}/services`),
      itemTypes: store.queryPath('item-type', `${inventoriesPath}/item_types`),
      inventories: store.queryPath('inventory-item', inventoriesPath)
    }).then(({ vendor, services, inventories, itemTypes }) => {
      if (!order) {
        //Create empty order
        const shipping = store.createRecord('shipping');
        const orderItems = inventories.map((inventory) => {
          return store.createRecord('order-item', {
            inventoryItem: inventory
          });
        });

        order = store.createRecord('order', {
          vendor,
          customer,
          shipping,
          orderItems
        });
      }

      return RSVP.resolve({
        services,
        itemTypes,
        vendorId,
        order
      });
    });
  },

  deactivate(){
    this._super();

    if(get(this, 'recordShouldBeDestroyed')){
      const deliveryModel = this.modelFor(ROUTE_MAKE_ORDER_DELIVERY);

      set(this, 'controller.model.order', null);

      deliveryModel && set(deliveryModel, 'selectedMethodId', null);
      set(this,'recordShouldBeDestroyed', false);
    }
  },

  actions: {

    willTransition(transition) {

      if (!(new RegExp(MAKE_ORDER_TRANSITION_EXCEPTIONS)).test(transition.targetName)) {
        set(this,'recordShouldBeDestroyed', true);
      }
    }
  }
});