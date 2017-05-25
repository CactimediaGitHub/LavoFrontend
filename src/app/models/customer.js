import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import Ember from 'ember';
import { hasMany } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';
import { NO_AVATAR_IMAGE } from 'lavo-mobile/constants';
const { computed } = Ember;

const Validations = buildValidations({
  phone: {
    description: 'Phone',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 7,
        max: 7
      })
    ],
  },
  prefixPhone: {
    description: 'Prefix Phone',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 3,
        max: 3
      })
    ],
  },
  name: validator('presence', true),
  surname: validator('presence', true),
  email: {
    description: "Email",
    validators: [
      validator('presence', true),
      validator('format', { type: 'email' }),
    ]
  },
});

export default Model.extend(Validations, {
  name: attr(),
  surname: attr(),
  email: attr(),
  avatar: attr(),
  phone: attr(),
  prefixPhone: attr(),
  activated: attr('boolean'),
  addresses: hasMany('address'),
  avatarUrl: computed(function() {
    return this.get('avatar') || NO_AVATAR_IMAGE;
  }),
  fullName:computed(function(){
    return `${this.get('name')} ${this.get('surname')}`;
  }),
  firstLetter: computed(function() {
    if (this.get('name'))
      return this.get('name').split('')[0];
    return '';
  }),
  fullPhone: computed(function () {
    if (this.get('phone') && this.get('prefixPhone'))
      return `${this.get('prefixPhone')}${this.get('phone')}`;
    return '';
  })
});
