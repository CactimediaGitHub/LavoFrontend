import Ember from 'ember';
import moment from 'moment';

const { Controller, computed: { sort, reads }, get, set } = Ember;

export default Controller.extend({
  sortedModel: sort('model.monthList', function(a, b) {
    return moment(get(a, 'month')).unix() < moment(get(b, 'month')).unix();
  }),
  chosenMonth: reads('sortedModel.firstObject'),
  actions: {
    setSelectedMonth (month) {
      set(this, 'chosenMonth', month);
    }
  }
});
