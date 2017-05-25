import BaseValidator from 'ember-cp-validations/validators/base';

const ShippingDate = BaseValidator.extend({
  validate([start, period], options, model, attribute) {
    return start && !!period;
  }
});

ShippingDate.reopenClass({
  /**
   * Define attribute specific dependent keys for your validator
   *
   * @param {String}  attribute   The attribute being evaluated
   * @param {Unknown} options     Options passed into your validator
   * @return {Array}
   */
  getDependentsFor( /* attribute, options */ ) {
    return [];
  }
});

export default ShippingDate;
