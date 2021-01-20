// initialise Leaflet map
const map = L.map("map", {zoomControl: false}).setView([51.96, 7.607], 14);

// Basemaps
let streets = L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
    attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
var streets_Mapnik = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
let dark = L.tileLayer("https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png", {
    attribution:
        '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors',
    apikey: '98088fb3-64c2-4cd2-99e7-2be49ff0722d'
});
var topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});
var heavymetal = L.tileLayer('https://{s}.tile.thunderforest.com/spinal-map/{z}/{x}/{y}.png?apikey={apikey}', {
    attribution: '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    apikey: '2d840ed962cc48a193313a8c0eda33e7',
    maxZoom: 22
});
// Controls
new L.control.zoom({ position: 'topright' }).addTo(map);
L.control.layers({
    "OpenStreetMap": streets,
    "OSM Mapnik": streets_Mapnik,
    "OpenTopoMap": topo,
    "Dark Mode": dark,
    "Heavy Metal": heavymetal
}).addTo(map);
// Geocoder
L.control.geocoder('pk.267a89ad153e3cf0089b019ff949ac58').addTo(map);
/**
 * When the window is loaded the parking data is retrieved from the server and the visualized on the map.
 */
function init_map() {
    let carParksArray = this.preferences.parkingLots;
    // save the extracted trees into the global variabel, so that future access is easier
    let carParksGeoJSON = constructGeoJSON(carParksArray);
    var rainbow = new Rainbow();
    var style = getComputedStyle(document.body);
    // Set start and end colors
    rainbow.setSpectrum(style.getPropertyValue('--has-capacity'), style.getPropertyValue('--no-capacity'));

    // Set the min/max range
    rainbow.setNumberRange(0, 793);

    L.geoJSON(carParksGeoJSON,{
        pointToLayer: function (feature, latlng) {
            let parkingIcon = L.divIcon({
                //TODO: the color should be set according to current percentage/amount of free parking spaces
                html: '<i class="fas fa-parking fa-2x" style="color:#' + rainbow.colourAt(feature.properties.capacity) + '"></i>',
                iconSize: [20, 20],
                className: 'myDivIcon'
            });
            return L.marker(latlng, {icon: parkingIcon});
        },
        onEachFeature: onEachFeature.bind(this)
    })
        .addTo(map);

    // create standard route
    var routing = L.Routing.control({
    router: L.routing.mapbox("pk.eyJ1IjoiYmVubmlkaWV0eiIsImEiOiJjamlteXFncDQwOWM0M3BtY25kNW9sbDI3In0.EfqsydBSwDkCAyp8a6Hspw"),
        routeWhileDragging: true
    })
    points = []
    for (var i in preferences.parkingLots) {
        points.push([preferences.parkingLots[i]["lat"], preferences.parkingLots[i]["lon"]])
    }
    addRoute(routing, points);
    //routing.addTo(map);
    
};


function constructGeoJSON(carParksArray) {
    let resultingGeoJSON = {"type":"featureCollection", features: []};
    carParksArray.forEach((carPark, i) => {
        let temp = {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "Point",
                "coordinates": [carPark.lon, carPark.lat]
            }
        }
        for (const [key, value] of Object.entries(carPark)) {
            temp.properties[key] = value;
        }
        temp.properties.index = i;
        resultingGeoJSON.features.push(temp)
    })
    return resultingGeoJSON;
}

/**
 * bind a popup to a given feature
 * @param feature
 * @param layer
 */
function onEachFeature(feature, layer) {
    //bind click
    layer.on({
        click: whenClicked.bind(this)
    });
}
function whenClicked(e) {
    this.preferences.selectedParkingLot = e.target.feature.properties.index;
}


  /**
* function called at the beginning for the standard route and with a click
* on a citiy buttons. Creates a small route around the center of the city
*/
function addRoute(routing, points) {
    //map.setView([latitude, longitude],13);
    wayPoints = []
    for (var i = 0; i < 4; i++) {
        wayPoints.push(L.latLng(points[i][0], points[i][1]))
    }
    routing.setWaypoints(wayPoints);
}