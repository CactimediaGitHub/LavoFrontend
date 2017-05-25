export function initialize() {
  const MapboxGL = window.mapboxgl;

  if (!MapboxGL) {
    return;
  }

  const protoCreateContent = MapboxGL.Popup.prototype._createContent;
  const protoRemove = MapboxGL.Popup.prototype.remove;

  MapboxGL.Popup.prototype._onClick = function(event) {
    const map = this._map;
    const coords = this.getLngLat();

    map.fire('click', {
      lngLat: coords,
      originalEvent: event,
      point: map.transform.locationPoint(coords)
    });
  };

  MapboxGL.Popup.prototype._createContent = function() {
    protoCreateContent.apply(this, arguments);

    this._content.addEventListener('click', this._onClick.bind(this));

    return this;
  };

  MapboxGL.Popup.prototype.remove = function() {
    this._content.removeEventListener('click', this._onClick.bind(this));

    protoRemove.apply(this);

    return this;
  };
}

export default {
  name: 'map',
  initialize
};
