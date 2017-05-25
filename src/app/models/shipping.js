import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import { belongsTo } from 'ember-data/relationships';
import { validator, buildValidations } from 'ember-cp-validations';
import Ember from 'ember';
import moment from 'moment';

const { computed } = Ember;
const Validations = buildValidations({
  pickUp: validator('shipping-date'),
  dropOff: validator('shipping-date'),
  address: validator('presence', true)
});

export default Model.extend(Validations, {
  state: attr(),
  address: belongsTo('address'),
  order: belongsTo('order'),
  shippingMethod: belongsTo('shipping-method'),
  pickUp: attr('shipping-period'),
  dropOff: attr('shipping-period'),
  pickUpFormatted: computed(function() {
    let pickUpStart = moment(this.get('pickUp')[0]);
    let [startHours, endHours] = this.get('pickUp')[1].split('-');
    let suffix = (startHours >= 12) ? ' PM' : ' AM';
    startHours = (startHours > 12) ? startHours - 12 : startHours;
    startHours = (startHours === '00') ? 12 : startHours;
    startHours = startHours + '' + suffix;
    suffix = (endHours >= 12) ? ' PM' : ' AM';
    endHours = (endHours > 12) ? endHours - 12 : endHours;
    endHours = (endHours === '00') ? 12 : endHours;
    endHours = endHours + '' + suffix;
    return `${pickUpStart.format('DD.MM.Y')}, (${startHours} - ${endHours})`;
  }),
  dropOffFormatted: computed(function() {
    let dropOffStart = moment(this.get('dropOff')[0]);
    let [startHours, endHours] = this.get('dropOff')[1].split('-');
    let suffix = (startHours >= 12) ? ' PM' : ' AM';
    startHours = (startHours > 12) ? startHours - 12 : startHours;
    startHours = (startHours == '00') ? 12 : startHours;
    startHours = startHours + '' + suffix;
    suffix = (endHours >= 12) ? ' PM' : ' AM';
    endHours = (endHours > 12) ? endHours - 12 : endHours;
    endHours = (endHours == '00') ? 12 : endHours;
    endHours = endHours + '' + suffix;
    return `${dropOffStart.format('DD.MM.Y')}, (${startHours} - ${endHours})`;
  })
});
