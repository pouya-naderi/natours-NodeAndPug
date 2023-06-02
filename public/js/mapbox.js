export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoicG91eWFuYWRlcmkiLCJhIjoiY2xpMDZzeHk0MDByOTNzbnV0azIydjIzaiJ9.cmcUpnghKzwHIIt-AbBqxA';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/pouyanaderi/cli06zs5g02ed01qye9nea748',
    scrollZoom: false,
    // center: [-118, 34],
    // zoom: 4,
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    // Create marker
    const el = document.createElement('div');
    el.className = 'marker';

    // Add Marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    // Add Popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    // Extend mapbox to include the current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
