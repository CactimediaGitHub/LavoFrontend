import Ember from 'ember';
import InfinityRoute from 'ember-infinity/mixins/route';

const { get, set, Mixin } = Ember;

export default Mixin.create(InfinityRoute, {
  pageParam: 'page[number]',
  perPageParam: 'page[size]',
  totalPagesParam: 'meta.total-pages',

  _path: null,

  _requestNextPage() {
    const path = get(this, '_path');
    const modelName = get(this, '_infinityModelName');
    const nextPage = this.incrementProperty('currentPage');
    const params = this._buildParams(nextPage);

    return get(this, 'store')
      .queryPath(modelName, path, params)
      .then(this._afterInfinityModel(this));
  },

  infinityQueryPath(modelName, path, options, boundParams) {
    set(this, '_path', path);

    return this.infinityModel(modelName, options, boundParams);
  }
});
