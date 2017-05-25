import Ember from 'ember';
import {
  ORDER_STATUS_PENDING,
  ORDER_STATUS_UPDATING,
  ORDER_STATUS_APPROVING,
  ROUTE_ORDER_SINGLE_VIEW,
  ROUTE_ORDER_SINGLE_APPROVE
} from 'lavo-mobile/constants';

let linksList = {};

linksList[ORDER_STATUS_PENDING] = ROUTE_ORDER_SINGLE_VIEW;
linksList[ORDER_STATUS_UPDATING] = ROUTE_ORDER_SINGLE_VIEW;
linksList[ORDER_STATUS_APPROVING] = ROUTE_ORDER_SINGLE_APPROVE;

export default Ember.Controller.extend({
  linksList
});
