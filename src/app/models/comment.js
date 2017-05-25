import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import Ember from 'ember';
import { NO_AVATAR_IMAGE } from 'lavo-mobile/constants';

const { computed }= Ember;

export default Model.extend({
  body: attr('string'),
  title: attr('string'),
  reviewerId: attr('number'),
  reviewerType: attr('string'),
  reviewerName: attr('string'),
  reviewerAvatar: attr('string'),
  reviewable: belongsTo('review'),
  reviewerAvatarUrl: computed(function(){
    return this.get('reviewerAvatar') || NO_AVATAR_IMAGE;
  }),
  createdAt: attr('date', { defaultValue: 0 }),
});
