import Model from 'ember-data/model';
import attr from 'ember-data/attr';

export default Model.extend({
    month: attr(),
    ordersCompleted: attr('number'),
    totalTransactions: attr('number'),
    commission: attr('number'),
    netAmount: attr('number')
});
