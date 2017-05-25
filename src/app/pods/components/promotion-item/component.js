import Ember from 'ember';

const { computed, get, String: { htmlSafe } } = Ember;
export default Ember.Component.extend({
  promotion: false,
  classNames: 'ember-view ui info card promotion',
  attributeBindings: ['style'],
  style: computed('promotion', function(){
    return htmlSafe(`background-image:url(${get(this,'promotion.backgroundImageUrl')})`);
  })
})
