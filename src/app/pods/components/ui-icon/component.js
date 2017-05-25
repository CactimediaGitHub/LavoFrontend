import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'i',
  classNames: ['icon'],
  classNameBindings: ['name'],

  click() {
    const { onClick }= this.attrs;

    if (onClick) {
      onClick();
    }
  }
});
