import { moduleForModel, test } from 'ember-qunit';

moduleForModel('shipping', 'Unit | Model | shipping', {
  // Specify the other units that are required for this test.
  needs: ['model:address', 'model:order']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});
