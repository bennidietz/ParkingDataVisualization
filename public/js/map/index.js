// initialise Leaflet map
var map = L.map("map", {zoomControl: false}).setView([51.957, 7.625], 15);

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
map.on({
        click: whenNothingClicked.bind(this)
    });;
let navigationLayer = L.layerGroup().addTo(map);
let destinationLayer = L.layerGroup().addTo(map);
let layers = L.layerGroup().addTo(map);
// Geocoder

var geocoderControlOptions = {
    defaultMarkGeocode: false,
    focus: [51.957, 7.625],
    panToPoint: false,
    markers: false,
    maxLength: 5,
    params: {
        bouded: 1,
        countrycodes: "DE"
    },
    textStrings: {
        INPUT_PLACEHOLDER: "🔍 Find address or location in Münster..."
    }
}
var geocoder = new L.control.geocoder('pk.267a89ad153e3cf0089b019ff949ac58', geocoderControlOptions).addTo(map).on('select', function (e) {
    onDestinationSelected(e.latlng.lat, e.latlng.lng) // e.feature.feature.display_name
});
geocoder.addTo(map)
var routing = null; // assign later

/**
 * When the window is loaded the parking data is retrieved from the server and the visualized on the map.
 */
function init_map() {
    layers.clearLayers();
    let carParksArray = this.preferences.filteredParkingLots;
    let days = Object.keys(this.preferences.optimizedOcupancies);
    var daySub = this.preferences.date.day,
        day = days.filter(function (str) { return str.indexOf(daySub) !== -1; })[0];
    let currOccupancyAnalyst = this.preferences.optimizedOcupancies[day][this.preferences.hour]
    let currOccupancyCitizen = this.preferences.occupancy[day][this.preferences.hour]
    // save the extracted trees into the global variabel, so that future access is easier
    let carParksGeoJSON = constructGeoJSON(carParksArray);
    var rainbow = new Rainbow();
    var style = getComputedStyle(document.body);
    // Set start and end colors
    rainbow.setSpectrum(style.getPropertyValue('--no-capacity'),
        style.getPropertyValue('--med-capacity'),
        style.getPropertyValue('--has-capacity'));
    // Set the min/max range
    rainbow.setNumberRange(0, 1);
    L.geoJSON(carParksGeoJSON,{
        pointToLayer: function (feature, latlng) {
            let openingTimes;
            switch(day) {
                case "Sunday":
                    openingTimes = feature.properties.opening_times_su;
                    break;
                case "Saturday":
                    openingTimes = feature.properties.opening_times_sa;
                    break;
                case "Friday":
                    openingTimes = feature.properties.opening_times_fr;
                    break;
                default:
                    openingTimes = feature.properties.opening_times_mo_to_th;
            }
            openingTimes = (openingTimes) ? JSON.parse(openingTimes.replace(":",",")) : [25,26];
            openingTimes[1] = (openingTimes[1]<openingTimes[0]) ? openingTimes[1] + 23 : openingTimes[1];
            let hour = this.preferences.hour;
            let open = (hour>=openingTimes[0] && hour<openingTimes[1])
            let currFreeForFeatureCitizen = (currOccupancyCitizen) ? currOccupancyCitizen[feature.properties.name] : -1;
            let currFreeForFeatureAnalyst = (currOccupancyAnalyst) ? currOccupancyAnalyst[feature.properties.name] : -1;
            return (this.preferences.view !== "analyst") ?
                basicSymbol(latlng, open, true, rainbow, feature.properties.capacity, currFreeForFeatureCitizen , feature.properties.index != this.preferences.selectedParkingLot, style)
                : analystSymbol(latlng, !(feature.properties.index != this.preferences.selectedParkingLot), feature.properties.capacity, currFreeForFeatureAnalyst, style);
        },
        onEachFeature: onEachFeature.bind(this)
    })
        .addTo(layers);

    routing = L.Routing.control({
        router: L.routing.mapbox("pk.eyJ1IjoiYmVubmlkaWV0eiIsImEiOiJjamlteXFncDQwOWM0M3BtY25kNW9sbDI3In0.EfqsydBSwDkCAyp8a6Hspw"),
        routeWhileDragging: true,
        profile: 'walking'
    }).addTo(map);
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

function whenNothingClicked(e) {
    if (this.preferences.view == "analyst") {
        this.preferences.selectedParkingLot = null;
    } else if (this.preferences.view == "citizen") {
        addMarker(e);
    }
}

function addMarker(e) {
    navigationLayer.clearLayers();
    var newMarker = new L.marker(e.latlng).addTo(navigationLayer);
    newMarker.bindPopup("<p>Navigate here?</p></br><button onclick='onDestinationSelected("+ e.latlng.lat +","+ e.latlng.lng +")'>Yes</button><button onclick='closeMarker()'>No</button>").openPopup();
}

function addDestinationMarker(lat, lng) {
    var newMarker = new L.marker(L.latLng(lat,lng));
    newMarker.addTo(destinationLayer);
}

function navigate(lat,lng) {
    $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng, function(data){
        let navigationMarker = navigationLayer.getLayers()[0];
        navigationMarker._popup.setContent(data.display_name);
    });
}

function closeMarker(){
    navigationLayer.clearLayers();
}

function onDestinationSelected(lat, lng) {
    let threshold = 50
    navigationLayer.clearLayers();
    destinationLayer.clearLayers();
    addDestinationMarker(lat, lng)
    var distances = []
    for (var i in this.preferences.filteredParkingLots) {
        var lot = this.preferences.filteredParkingLots[i]
        var dist = Number(calcCrow(Number(lot.lat), Number(lot.lon), lat, lng))
        var occ = this.preferences.occupancy[preferences.days[preferences.day]][preferences.hour][lot.name]
        distances.push([dist, Number(i), occ])
    }
    var sort = distances.sort(function(a,b){return a[0] > b[0] ? 1 : -1})
    var filter = sort.filter(function(a){return a[2] > threshold})
    lot1 = this.preferences.filteredParkingLots[filter[0][1]]
    lot2 = this.preferences.filteredParkingLots[filter[1][1]]
    lot3 = this.preferences.filteredParkingLots[filter[2][1]]
    var wp = [[lot1.lat, lot1.lon], [lat,lng]]
    console.log(wp)
    //addRoute(routing, wp)
    return [lot1, lot2, lot3]
}

function presentRouteAlternatives(routes) {
    for (var i in routes) {
        //addRoute(routing, [[lot1.lat, lot1.lon], [lat,lng]])
    }
    
}

// @source: https://stackoverflow.com/a/18883819
// This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) {
    return Value * Math.PI / 180;
}

/**
 * function called at the beginning for the standard route and with a click
 * on a citiy buttons. Creates a small route around the center of the city
 */
function addRoute(routing, points) {
    //map.setView([latitude, longitude],13);
    wayPoints = []
    routing.setWaypoints(wayPoints)
    for (var i in points) {
        console.log(L.latLng(Number(points[i][0]), Number(points[i][1])))
        wayPoints.push(L.latLng(Number(points[i][0]), Number(points[i][1])))
    }
    console.log(wayPoints)
    routing.setWaypoints(wayPoints);
}
function analystSymbol(latlng, selected, capa, currOcc, style) {
    return L.marker(latlng, {icon: L.canvasIcon({
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            drawIcon: function (icon, type) {
                if (type == 'icon') {
                    var ctx = icon.getContext('2d');
                    var lastend = -1.5708;
                    var data = [capa-currOcc,currOcc]; // If you add more data values make sure you add more colors
                    var myTotal = 0; // Automatically calculated so don't touch
                    var myColor = [style.getPropertyValue('--no-data'), style.getPropertyValue('--no-data')]; // Colors of each slice
                    if (currOcc != -1) {
                        myColor = [style.getPropertyValue('--no-capacity'), style.getPropertyValue('--has-capacity')];
                    }
                    for (var e = 0; e < data.length; e++) {
                        myTotal += data[e];
                    }

                    for (var i = 0; i < data.length; i++) {
                        ctx.fillStyle = myColor[i];
                        ctx.beginPath();
                        var size = L.point(this.options.iconSize);
                        ctx.moveTo(Math.floor(size.x / 2), Math.floor(size.y / 2));
                        // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
                        ctx.arc(size.x / 2, size.y / 2, (size.y-3) / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
                        ctx.lineTo(Math.floor(size.x / 2), Math.floor(size.y / 2));
                        ctx.fill();
                        if(selected) {
                            ctx.beginPath();
                            ctx.arc(size.x / 2, size.y / 2, (size.y - 2) / 2, 0, 2 * Math.PI);
                            ctx.strokeStyle = '#0046db';
                            ctx.lineWidth = 2;
                            ctx.stroke();
                        }
                        lastend += Math.PI * 2 * (data[i] / myTotal);
                    }
                    /*
                    new Chart(ctx, {
                        type: 'pie',
                        data: {
                            labels: ["Free", "Occupied"],
                            datasets: [{
                                label: "Population (millions)",
                                backgroundColor: ["#3cba9f", "#c45850"],
                                data: [3, 5]
                            }]
                        },
                        options: {
                            title: {
                                display: true,
                                text: "Occupancy",
                                fontSize: 18
                            }
                        }
                    });
                     */
                }
            }
        })
    });
}

function basicSymbol(latlng, open, gradient, rainbow, capa, currFree, selected, style) {
    let occPerc;
    if(currFree) {
        occPerc = currFree/capa
    } else {
        occPerc = 0;
    }
    let color;
    if (currFree == -1) {
        color = style.getPropertyValue('--no-data');
    } else {
        if (gradient) {
            color = "#" + rainbow.colourAt(occPerc);
        } else {
            if (occPerc < 0.01) {
                color = style.getPropertyValue('--no-capacity');
            } else if (occPerc < 0.5) {
                color = style.getPropertyValue('--med-capacity');
            } else {
                color = style.getPropertyValue('--has-capacity');
            }
        }
    }
    let symbol = (open) ? "fa-parking" : "fa-times"
    let html;
    if(selected) {
        html = '<i class="fas '+ symbol + ' fa-2x" style="color:' + color + ';font-size: 3em;"></i>';
    } else {
        html = '<span class="fa-stack-4x">' +
            '<i class="fas fa-square fa-stack-2x" style="color:#0046db;-webkit-text-stroke-width: 4px;\n' +
            '-webkit-text-stroke-color: #0046db;font-size: 3em;"></i>' +
            '<i class="fas '+ symbol + ' fa-stack-2x" style="color:' + color + ';font-size: 3em;"></i>' +
            '</span>'
    }

    return L.marker(latlng, {
        icon: L.divIcon({
            html: html,
            iconSize: [40, 40],
            iconAnchor: [20, 20],
            className: 'myDivIcon'
        })
    });
}
