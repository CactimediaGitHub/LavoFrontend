export function initialize(application ) {
  application.inject('route', 'session', 'service:session');
  application.inject('route', 'dialogWindow', 'service:dialog-window');
  application.inject('component', 'dialogWindow', 'service:dialog-window');
  application.inject('controller', 'session', 'service:session');
}

export default {
  name: 'session-service',
  initialize
};
