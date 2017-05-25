import Ember from 'ember';
import { FILTER_BY_VENDOR_ITEM, FILTER_BY_VENDOR_SERVICE } from 'lavo-mobile/constants';

const { A, isEmpty } = Ember;

export function serialize(filters) {
  if(isEmpty(filters)) {
    return undefined;
  }
  if(filters[FILTER_BY_VENDOR_ITEM] && filters[FILTER_BY_VENDOR_ITEM].length) {
    filters[FILTER_BY_VENDOR_ITEM] = filters[FILTER_BY_VENDOR_ITEM].join('-');
  }
  if(filters[FILTER_BY_VENDOR_SERVICE] && filters[FILTER_BY_VENDOR_SERVICE].length) {
    filters[FILTER_BY_VENDOR_SERVICE] = filters[FILTER_BY_VENDOR_SERVICE].join('-');
  }
  return filters.join(',');
}

export function deserialize(filter) {
  if (isEmpty(filter)) {
    return {};
  }

  return A(filter.split(','))
    .reduce((cache, filterItem)=> {
      const result = filterItem.split('=');
      if(result[0] === FILTER_BY_VENDOR_ITEM) {
        cache[result[0]] = result[1].split('-');
      } else if(result[0] === FILTER_BY_VENDOR_SERVICE) {
        cache[result[0]] = result[1].split('-');
      } else {
        cache[result[0]] = result[1];
      }

      return cache;
    }, {});
}
