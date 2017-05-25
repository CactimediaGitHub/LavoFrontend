import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['item'],
  _initialize: Ember.on('didRender', function() {
    let self = this;
    this.$().swipe({
      threshold: 40,
      swipeLeft:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
        self.$().css('background-color', `rgba(255,255,255,1)`);
        self.sendAction('slideLeftAction');
      },
      swipeRight:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
        self.$().css('background-color', `rgba(255,255,255,1)`);
        self.sendAction('slideRightAction');
      },
      swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
        let absDistance = Math.abs(distance);
        if (absDistance > 60) {
          absDistance = 60;
        }
        const color = 255 - absDistance;
        if ( direction === 'left' ) {
          self.$().css('background-color', `rgba(255, ${color}, ${color}, .75)`);
        } else if ( direction === 'right' ) {
          self.$().css('background-color', `rgba(${color}, 255, ${color}, .75)`);
        }
        if(phase === 'cancel'|| phase === 'end') {
          self.$().css('background-color', `rgba(255, 255, 255, 1)`);
        }
      },
      allowPageScroll: 'vertical'
    });
  })

});
