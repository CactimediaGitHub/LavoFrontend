import Ember from 'ember';
import Input from '../ui-input/component';

const { computed } = Ember;
/**
 * Select helper can receive 3 type of values
 * 1 - An array of values([1,2,3,4,5])
 * 2 - An object ({"one":1,"two":2})
 */
export default Input.extend({
  values: [],
  placeholder: "select",
  showDropdownIcon: false,
  wrapClasses: '',
  classNames:['with-select','item'],
  currentValue: computed(function() {
    return this.get(`model.${this.valuePath}`);
  }),
  formattedValues: computed(function() {
    let values = this.get('values');
    if (Array.isArray(values)) {
      return values.reduce((result, item) => {
        result[item] = item;
        return result;
      }, {})
    }
    return values;
  }),

  actions: {
    setValue(value) {
      this.set(`model.${this.valuePath}`, value);
      this.notifyPropertyChange('currentValue');
    }
  }
});
