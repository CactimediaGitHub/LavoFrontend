import Ember from 'ember';
import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';
import { DEFAULT_ADDRESS_NICKNAME } from 'lavo-mobile/constants';

const Validations = buildValidations({
  address1: validator('presence', { presence: true, ignoreBlank: true }),
  city: validator('presence', { presence: true, ignoreBlank: true }),
  country: validator('presence', { presence: true, ignoreBlank: true }),
  humanName:[
    validator('presence', { presence: true, ignoreBlank: true }),
  ]
},{
  debounce: 500
});

export default Model.extend(Validations, {
  address1: attr(),
  address2: attr(),
  city: attr(),
  state: attr(),
  country: attr(),
  nearestLandmark: attr(),
  humanName: attr(),
  isDefault: Ember.computed('humanName', function() {
    return this.get('humanName') === DEFAULT_ADDRESS_NICKNAME;
  }),
  customer: belongsTo('customer'),
  fullAddress: Ember.computed(function() {
    if (this.get('address2'))
      return `${this.get('address1')}, ${this.get('address2')}, ${this.get('city')}, ${this.get('country')}`;
    return `${this.get('address1')}, ${this.get('city')}, ${this.get('country')}`;
  }),
});
