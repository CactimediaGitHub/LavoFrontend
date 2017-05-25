import Ember from 'ember';
import RouteHistoryMixin from 'ember-route-history/mixins/routes/route-history';
const {set, get, Route, $} = Ember;

export function initialize(appInstance) {
  /**
   * Implementing route history mixin to every route
   */

  Route.reopen(RouteHistoryMixin);

  /**
   * Optimizing keyboard appearing on mobile devices
   */

  let stateService = appInstance.lookup('service:state');
  document.addEventListener("deviceready", () => {
    
    let platform = get(window, 'cordova.platformId');
    /**
     * Hiding splash screen
     */
    if(navigator.splashscreen){
      navigator.splashscreen.hide()
    };

    /**
     * Replacing standart alert with cordova alert
     */
    if(navigator.notification) {
      window.alert = function (text) {
        navigator.notification.alert(text, () => {
        }, "Lavo");
      }
      window.confirm = function (text, cb) {
        navigator.notification.confirm(text, cb, "Lavo");
      }

      window.prompt = function (text, cb) {
        navigator.notification.prompt(text, cb, "Lavo");
      }
    }


    /**
     * Removes intro animation in case if app was minimized during play
     */
    document.addEventListener("pause", () => set(stateService,'needVideo', false));

    /**
     * Redirecting to location on resume, to get the user's current lat lon
     */
    document.addEventListener("resume", () => $(document).trigger('deviceready'), false);

    /**
     * Optimizing input scroll position on focus
     */
    switch(platform){
      case 'android':
        window.addEventListener('native.keyboardshow', () => {
          let scrollElement = $('.keyboard-scroll');
          let clickedInput = $('input:focus');
          if(clickedInput) {
            scrollElement.scrollTop(scrollElement.scrollTop() + clickedInput.position().top - 50);
          }
        });
      case 'ios':
        window.cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
      default:
        window.addEventListener('native.keyboardshow',
          () => set(stateService, 'keyboardOpened',true));
        window.addEventListener('native.keyboardhide',
          () => set(stateService, 'keyboardOpened',false));
        break;
    }

  });
}

export default {
  name: 'application',
  initialize
};
