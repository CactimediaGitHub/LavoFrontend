import Ember from 'ember';
import RouteRedirectTo from 'lavo-mobile/mixins/route-redirect-to-mixin';
import RouteForm from '../../../mixins/route-form-mixin';
import { ROUTE_CARD_LIST } from 'lavo-mobile/constants';

const { Route } = Ember;

export default Route.extend(RouteRedirectTo, RouteForm, {
  redirectToDefault: ROUTE_CARD_LIST
});
