import Ember from 'ember';

const {set, Component} = Ember;

export default Component.extend({
  tagName: 'pre',
  classNames: ['ui error alert'],

  message: null,
  type: null,
  click(){
    set(this, 'message', null);
  }
});
