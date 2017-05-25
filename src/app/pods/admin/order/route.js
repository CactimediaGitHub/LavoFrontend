import Ember from 'ember';
import AuthenticatedGuestRouteMixin from 'lavo-mobile/mixins/authenticated-guest-route-mixin';

let { get, RSVP, Route} = Ember;

export default Route.extend( AuthenticatedGuestRouteMixin, {
  model () {
    let { id } = get(this, 'session.currentUser');
    let { store } = this;
    const inventoriesPath = `/vendors/${id}/inventory_items`;

    return RSVP.hash({
      items: store.queryPath('service', `${inventoriesPath}/items`),
      services: store.queryPath('service', `${inventoriesPath}/services`),
      itemTypes: store.queryPath('item-type', `${inventoriesPath}/item_types`),
      inventories: store.queryPath('inventory-item', inventoriesPath),
      shippingMethods: store.queryPath('shipping-method', `/vendors/${id}/shipping_methods`)
    })
  },
});
