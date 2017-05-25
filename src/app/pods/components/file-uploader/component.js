import EmberUploader from 'ember-uploader';
import {isEmpty} from 'ember';

export default EmberUploader.FileField.extend({
  attributeBindings: ['capture', 'accept'],
  filesDidChange(files) {
    if (Ember.isEmpty(files)) {
      return;
    }
    this.sendAction('action', files[0]);
  },
});
