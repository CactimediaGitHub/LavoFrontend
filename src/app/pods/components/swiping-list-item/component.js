import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['swipe-wrapper'],
  fixed: false,
  canBeSwiped: true,
  canBeSwipedObserver: Ember.observer('canBeSwiped', function() {
    if(this.get('canBeSwiped')){
      this.initSwipe();
      this.set('fixed', false);
    }
  }),
  click (e) {
    self.$('.item').css('transform', `translateX( 0 )`);
    this.get('fixed') ? this.$().swipe('destroy') : this.initSwipe();

  },
  initSwipe() {
    let self = this;
    this.$().swipe({
      swipeLeft:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
        if(!self.get('fixed')) {
          self.$('.item').css('transform', `translateX( 0 )`)
        }
      },
      swipeRight:function(event, distance, duration, fingerCount, fingerData, currentDirection) {
        if(self.get('fixed')) {
          self.set('fixed', false);
          self.$('.item').css('transform', `translateX( 0 )`)
        }
      },
      swipeStatus:function(event, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
        if(direction === 'left' && distance < 120) {
          if(distance<120 && !self.get('fixed')) {
            self.$('.item').css('transform', `translateX(-${distance}px)`)
          }
          if(distance>100 && !self.get('fixed')) {
            self.set('fixed', true);
            self.$('.item').css('transform', `translateX(-120px)`)
          }
        }
      },
      allowPageScroll: 'vertical'
    });
  },
  _initialize: Ember.on('didRender', function() {
    if(this.get('canBeSwiped')){
      this.initSwipe();
    }
  })
});
