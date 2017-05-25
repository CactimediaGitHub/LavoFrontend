import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo, hasMany } from 'ember-data/relationships';

import { validator, buildValidations } from 'ember-cp-validations';

const Validations = buildValidations({
  title: validator('presence', true),
  body: validator('presence', true),
  rating:validator(function(value){
    return parseInt(value)>0;
  })
});

export default Model.extend(Validations, {
  body: attr('string'),
  title: attr('string'),
  reviewer: belongsTo('customer'),
  reviewable: belongsTo('vendor'),
  rating: attr('number', { defaultValue: 0 }),
  commentsCount: attr('number', { defaultValue: 0 }),
  likesCount: attr('number', { defaultValue: 0 }),
  createdAt: attr('date', { defaultValue: 0 }),
  likedByCurrentUser: attr('boolean', { defaultValue: false }),

  comments: hasMany('comment')
});
