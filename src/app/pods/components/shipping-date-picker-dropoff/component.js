import Ember from 'ember';
import ShippingDatePicker from 'lavo-mobile/pods/components/shipping-date-picker/component';

const {get, set, computed, Component, observer } = Ember;

export default ShippingDatePicker.extend({
  layoutName: 'components/shipping-date-picker',
  pickUpDate: null,
  pickUpPeriod: null,
  shippingDeliveryPeriod: null,
  /**
   * Min date computed according to lower period of pickup date
   */
  minDate: computed('pickUpDate', 'pickUpPeriod', function() {
    let minDate = get(this, 'pickUpDate');
    let shippingDeliveryPeriod = get(this, "shippingDeliveryPeriod");
    let pickUpPeriod = get(this, "pickUpPeriod");

    if (pickUpPeriod) {
      pickUpPeriod = parseInt(pickUpPeriod.split("-")[0]);
    } else {
      pickUpPeriod = 0;
      if (moment().isSame(minDate, 'day')) {
        pickUpPeriod = moment().get('hours');
      }

    }

    minDate = moment(minDate)
      .add((shippingDeliveryPeriod + pickUpPeriod), 'hours')
      .toDate();

    return minDate;
  }),
  periods: computed('schedules', 'date', 'pickUpDate', 'pickUpPeriod', function() {
    return this.buildPeriods();
  }),
  didReceiveAttrs() {

    if (!get(this, 'pickUpPeriod')) {
      const minDate = moment(this.get('minDate'));
      this.set('date',minDate);
    }

  },
  buildPeriods() {
    const date = moment(get(this, 'date'));
    const pickUpDate = moment(get(this, 'pickUpDate'));
    const pickUpPeriod = get(this, 'pickUpPeriod');
    let periods = this._super();
    let hoursBeforeDropOff = get(this, 'shippingDeliveryPeriod');

    if (pickUpPeriod) {
      hoursBeforeDropOff += parseInt(pickUpPeriod.split('-')[0]);
    } else {
      hoursBeforeDropOff += moment().get('hours');
    }

    const pickUpDateTime = moment(get(this, 'pickUpDate')).add(hoursBeforeDropOff, 'hours');
    let hoursLowerLimit = 0;

    if (date.isSame(pickUpDateTime, 'day')) {
      hoursLowerLimit = pickUpDateTime.get('hours')
    }

    return periods.filter((v) => {
      const [start, end] = v.value.split('-');
      return start >= hoursLowerLimit;
    });
  },
  pickUpDateChangeObserver: observer('pickUpDate', 'pickUpPeriod', function() {
    let minDate = moment(get(this, 'minDate'));
    let date = get(this, 'date');

    if (moment(date).diff(minDate) < 0) {
      set(this, 'date', minDate);
      set(this, 'period', null);
      this.fireChanges();
    }
  }),
});
