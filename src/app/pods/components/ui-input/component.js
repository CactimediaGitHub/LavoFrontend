import Ember from 'ember';

const {
  get,
  computed,
  defineProperty,
  Component,
  inject: {service}
} = Ember;

export default Component.extend({
  state: service(),

  classNames: ['item'],
  classNameBindings: ['showErrorClass:has-error', 'isValid:has-success'],

  maxlength: null,
  model: null,
  value: null,
  type: 'text',
  valuePath: '',
  placeholder: '',
  validation: null,
  isTyping: false,
  displayedValue: computed('value', function(value){
    if (get(this, 'type') === 'password') {
      return Array(get(this, 'value.length')).join('•');
    }
    return get(this, 'value');
  }),
  notValidating: computed.not('validation.isValidating'),
  didValidate: computed.oneWay('targetObject.didValidate'),
  hasContent: computed.notEmpty('value'),
  isValid: computed.and('hasContent', 'validation.isValid', 'notValidating'),
  isInvalid: computed.oneWay('validation.isInvalid'),
  showErrorClass: computed.and('notValidating', 'showMessage', 'validation'),
  showMessage: computed('validation.isDirty', 'isInvalid', 'didValidate', function () {
    return (get(this, 'validation.isDirty') || get(this, 'didValidate')) && get(this, 'isInvalid');
  }),
  init() {
    let path;
    this._super(...arguments);

    path = get(this, 'valuePath');

    defineProperty(this, 'validation', computed.oneWay(`model.validations.attrs.${path}`));
    defineProperty(this, 'value', computed.alias(path ? `model.${path}` : `model`));
  }
});
