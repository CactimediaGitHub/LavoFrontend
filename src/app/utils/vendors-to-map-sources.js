export default function vendorsToMapSources(vendors) {
  return [{
    id: 'points',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: vendors.map((vendor) => {
          return {
            type: 'Feature',
            properties: {
              id: vendor.get('id')
            },
            geometry: {
              type: 'Point',
              coordinates: [
                vendor.get('lon'),
                vendor.get('lat')
              ]
            }
          };
        })
      }
    }
  }];
}
