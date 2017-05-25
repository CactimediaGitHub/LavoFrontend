import Ember from 'ember';

export default Ember.Service.extend({
  alert(message) {
    navigator.notification.alert(message,() => {}, "Lavo");
  },
  prompt(message) {
    return new Ember.RSVP.Promise((resolve) => {
      navigator.notification.prompt(message, ({input1})=>{
        resolve(input1)
      }, "Lavo");
    })
  },
  confirm(message) {
    return new Ember.RSVP.Promise((resolve) => {
      navigator.notification.confirm(message, (data)=>{
        resolve(!(data-1));
      }, "Lavo");
    })
  }
});
