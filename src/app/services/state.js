import Ember from 'ember';
import { ROUTE_VENDOR_TILES } from '../constants';

const { Service } = Ember;

export default Service.extend({
  isSearchEnabled: false,
  isPending: false,
  clickedElement: false,
  searchResult: 0,
  currentRoute: ROUTE_VENDOR_TILES,
  needVideo: true,
  keyboardOpened:false,
  filterSelectedServiceID:null,
  filterSelectedServiceIDs:[],
  filterSelectedItemTypeID:null
});
