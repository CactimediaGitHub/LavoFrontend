import Ember from 'ember';
import {
	ROUTE_ORDERS_LIST,
	ROUTE_MAIN,
	ROUTE_ADMIN_ORDER_LIST,
	ROUTE_ADMIN
} from 'lavo-mobile/constants';

const { Mixin, get, setProperties } = Ember;

export default Mixin.create({

	afterModel (model) {
		let higherModel;

		if (get(this, 'routeName').indexOf(ROUTE_MAIN) + 1){
			higherModel = this.modelFor(ROUTE_ORDERS_LIST);
		} 
		if (get(this, 'routeName').indexOf(ROUTE_ADMIN) + 1){
			higherModel = this.modelFor(ROUTE_ADMIN_ORDER_LIST);
		} 
		if (!higherModel) {
			console.error('check route, you\'ve mixed this in');
		}
		
		setProperties(higherModel, {
			newOrdersCount: get(model, 'orders.meta.new-orders-count'),
			activeOrdersCount: get(model, 'orders.meta.active-orders-count'),
			historyOrdersCount: get(model, 'orders.meta.history-orders-count'),
		});
	}

});