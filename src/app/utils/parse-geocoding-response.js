import Ember from 'ember';

const { get, isEqual } = Ember;
const countryTypes = JSON.stringify(["country", "political"]);
const cityTypes = JSON.stringify(["locality", "political"]);
const neighborhoodTypes = JSON.stringify(["neighborhood", "political"]);
const streetNumberTypes = JSON.stringify(["street_number"]);
const routeTypes = JSON.stringify(["route"]);

export default function parseGeocodingResponse(response) {
  let city, country, streetNumber, routeName, sublocalityLevelOne, neighborhoodName;
  let selectedAddressComponent = { index: 0 };
  get(response, 'results').forEach((results, index) => {
    results.address_components.forEach(addressComponent => {
      if (addressComponent.types[0] == 'neighborhood') {
        selectedAddressComponent['index'] = index;
      }
    });
  });

  let componentResult = 'results.' + selectedAddressComponent['index'] + '.address_components';
  
  get(response, componentResult).forEach( component => {
    if(isEqual(JSON.stringify(get(component, 'types')), neighborhoodTypes)) {
      neighborhoodName = get(component, 'short_name');
    }
    if(isEqual(JSON.stringify(get(component, 'types')), cityTypes)) {
      city = get(component, 'short_name');
    }
  });
  let location = '';
  let counter = 0;
  if (neighborhoodName) {
    counter += 1;
    location += `${neighborhoodName}`
  }
  if (city) {
    location += counter > 0 ? `, ${city}` : `${city}`;
  }
  return location;
}
