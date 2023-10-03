// Reference url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"
// Determine sizes for each markers on the map
function size(magnitude) {
    return magnitude * 4;
  }
// Loop thru the features and create one marker for each place object
function colors(magnitude) {
    let color = "";
    if (magnitude <= 1) {
      return color = "pink";
    }
    else if (magnitude <= 2) {
      return color = "yellow";
    }
    else if (magnitude <= 3) {
      return color = "blue";
    }
    else if (magnitude <= 4) {
      return color = "purple";
    }
    else if (magnitude <= 5) {
      return color = "light green";
    }
    else if (magnitude > 5) {
      return color = "red";
    }
    else {
      return color = "black";
    }
  }
// Get request to query url
d3.json(url).then(function(data){
    console.log(data.features);
    // One we get the response
    createFeatures(data.features);
});
    function createFeatures(earthquakedata) {
        console.log(earthquakedata[0].geometry.coordinates[1]);
        console.log(earthquakedata[0].geometry.coordinates[0]);
        console.log(earthquakedata[0].properties.mag);
        // define the function we want to use for each feature and
        // Do a pop up with the place and time of the earthquake
        function onEachFeature(feature, layer) {
            layer.bindPopup("<h3>" + feature.properties.place +
              "</h3><hr><p>" + new Date(feature.properties.time) + "</p>" +
              "<hr> <p> Earthquake Magnitude: " + feature.properties.mag + "</p>")
          }
          L.geoJSON(earthquakedata, {
            onEachFeature: onEachFeature,
            // creata a GeoJSON layer with the features array on earthquakeData
            pointToLayer: function (feature, coordinates) {
                // create markers, size and colors
                var geoMarkers = {
                    radius: size(feature.properties.mag),
                    fillColor: colors(feature.properties.mag),
                    fillOpacity: 0.40,
                    color: "#000000",
                    stroke: true,
                    weight: 0.5
                }
                return L.circleMarker(coordinates, geoMarkers);
            },
        }).addTo(map);
    }
        
    
let map = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5
});
let basemap = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });
basemap.addTo(map);

// Create a Legend for the Map 

var legend = L.control({
  position: 'bottomright'
});

legend.onAdd = function () {

  var div = L.DomUtil.create('div', 'info legend'),
  magnitude = [0, 1, 2, 3, 4, 5];

  for (var i = 0; i < magnitude.length; i++) {
    div.innerHTML += '<i style="background:' + colors(magnitude[i] + 1) + '"></i> ' +
    magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
  }

  return div;
};

  // Add the info legend to the map.
  legend.addTo(myMap);


   

