import Adapter from 'lavo-mobile/adapters/application';
import orderManualSerializer from 'lavo-mobile/utils/order-manual-serializer';
const { get } = Ember;
export default Adapter.extend({
  createRecord(store, type, snapshot) {
    const url = this.buildURL(type.modelName, null, snapshot, 'createRecord');

    return new Ember.RSVP.Promise((resolve, reject)=>{
      this.ajax(url, "POST",{
        data:orderManualSerializer(snapshot.record)
      }).then((data)=>{
        get(snapshot.record, 'orderItems').forEach((item)=>{
          item&&item.destroyRecord();
        });
        Ember.run(null, resolve, data);
      },(jqXHR)=>{
        jqXHR.then = null;
        Ember.run(null, reject, jqXHR);
      })
    });

  }
});