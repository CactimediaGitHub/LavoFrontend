import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {belongsTo} from 'ember-data/relationships';

export default Model.extend({
  shipping: belongsTo('shipping'),
  shippingCharge: attr('number'),
  shippingMethod: attr('string'),
  deliveryPeriod: attr()
});
