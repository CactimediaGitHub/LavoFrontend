import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  firstName: validator('format', {
    regex: /^[A-z]+$/,
    message: 'First name should contain only alpha characters'
  }),
  lastName: validator('format', {
    regex: /^[A-z]+$/,
    message: 'Last name should contain only alpha characters'
  }),
  nick: validator('presence', true),
  number: [
    validator('presence', true),
    validator('number', { allowString: true }),
    validator('length', { is: 16 })
  ],
  month: validator('presence', true),
  year: validator('presence', true),
  verificationValue: [
    validator('presence', true),
    validator('number', { allowString: true }),
    validator('length', { min: 3, max: 4 })
  ]
});

export default Model.extend(Validations, {
  firstName: attr(),
  lastName: attr(),
  nick: attr(),
  number: attr(),
  token: attr(),
  month: attr('number'),
  year: attr('number'),
  verificationValue: attr('number'),
  customer: belongsTo('customer'),
  firstPurchase: attr('boolean', {defaultValue: false}),
});
