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
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Controls
new L.control.zoom({ position: 'topright' }).addTo(map);
L.control.layers({
    "OpenStreetMap": streets,
    "OSM Mapnik": streets_Mapnik,
    "OpenTopoMap": topo,
    "Dark Mode": dark,
    "Heavy Metal": heavymetal,
    "Satellite": esri
}).addTo(map);
map.on({
        click: whenNothingClicked.bind(this)
    });
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
var geojson = null;
/**
 * When the window is loaded the parking data is retrieved from the server and the visualized on the map.
 */
function init_map() {
    let nocapacity = rgba2hex(this.preferences.redColor)
    let medcapacity = rgba2hex(this.preferences.yellowColor)
    let hascapacity = rgba2hex(this.preferences.greenColor)
    layers.clearLayers();
    if (preferences.view == 'analyst') {
        map.removeControl(geocoder);
        if (map.hasLayer(navigationLayer)) {
            map.removeLayer(navigationLayer);
            map.removeLayer(destinationLayer);
        }
    } else {
        geocoder.addTo(map);
        if (!map.hasLayer(navigationLayer)) {
            map.addLayer(navigationLayer);
            map.addLayer(destinationLayer);
        }
    }
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
    rainbow.setSpectrum(nocapacity,
        medcapacity,
        hascapacity);
    // Set the min/max range
    rainbow.setNumberRange(0, 1);
    geojson = L.geoJSON(carParksGeoJSON,{
        pointToLayer: function (feature, latlng) {
            let open = isOpen(day, feature.properties);
            let parkride = feature.properties.name.includes("P+R");
            let selected = feature.properties.index == this.preferences.selectedParkingLot;
            let hovered = (this.preferences.hoveredRoute != null) ? feature.properties.id == this.preferences.routes[this.preferences.hoveredRoute][1].id
            : false;
            let currFreeForFeatureCitizen = (currOccupancyCitizen) ? currOccupancyCitizen[feature.properties.name] : -1;
            let currFreeForFeatureAnalyst = (currOccupancyAnalyst) ? currOccupancyAnalyst[feature.properties.name] : -1;
            return (this.preferences.view !== "analyst") ?
                basicSymbol(latlng, parkride, open, true, rainbow, feature.properties.capacity, currFreeForFeatureCitizen, selected, hovered, style)
                : analystSymbol(latlng, selected, feature.properties.capacity, currFreeForFeatureAnalyst, style, nocapacity, hascapacity);
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
    let iconHtlm = '<i class="fas fa-location-arrow fa-2x" style="color:#0046db;font-size: 3em;"></i>'
    var newMarker = new L.marker(e.latlng, {
        icon: L.divIcon({
            html: iconHtlm,
            iconSize: [40, 40],
            iconAnchor: [40, 0],
            className: 'myDivIcon'
        })
    }).addTo(navigationLayer);
    newMarker.bindPopup("<div class='navigation-question-wrapper'><div class='navigation-question'>Navigate here?</div></br>" +
        "<button onclick='onDestinationSelected("+ e.latlng.lat +","+ e.latlng.lng +")' class='navigation-button'>Yes</button>" +
        "<button onclick='closeMarker()' class='navigation-button'>No</button></div>").openPopup();
    newMarker.getPopup().on('remove', function() {
        navigationLayer.clearLayers();
    });
}

function addDestinationMarker(lat, lng) {
    let iconHtlm = '<i class="fas fa-location-arrow fa-2x" style="color:#0046db;font-size: 3em;"></i>'
    var newMarker = new L.marker(L.latLng(lat,lng),{
        icon: L.divIcon({
            html: iconHtlm,
            iconSize: [40, 40],
            iconAnchor: [40, 0],
            className: 'myDivIcon'
        })
    });
    $.get('https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=' + lat + '&lon=' + lng, function(data){
        newMarker.bindPopup((data.name == null)? data.display_name : data.name).openPopup();
    });

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
    map.setView([lat, lng+0.004],16);
    let threshold = 50
    navigationLayer.clearLayers();
    destinationLayer.clearLayers();
    addDestinationMarker(lat, lng);
    let days = Object.keys(this.preferences.optimizedOcupancies);
    let day = days.filter(function (str) { return str.indexOf(this.preferences.date.day) !== -1; })[0];
    var distances = []
    for (var i in this.preferences.filteredParkingLots) {
        var lot = this.preferences.filteredParkingLots[i]
        var dist = Number(calcCrow(Number(lot.lat), Number(lot.lon), lat, lng))
        var occ = this.preferences.occupancy[preferences.days[preferences.day]][preferences.hour][lot.name]
        occ = (occ) ? occ : threshold+1;
        let open = isOpen(day, lot);
        if (open) {
            distances.push([Math.round(dist * 100) / 100, Number(i), occ, i])
        }
    }
    var sort = distances.sort(function(a,b){return a[0] > b[0] ? 1 : -1})
    var filter = sort.filter(function(a){return a[2] > threshold})
    filter[0][1] = this.preferences.filteredParkingLots[filter[0][1]]
    filter[1][1] = this.preferences.filteredParkingLots[filter[1][1]]
    filter[2][1] = this.preferences.filteredParkingLots[filter[2][1]]
    console.log(filter[0])
    preferences.routes = [filter[0], filter[1], filter[2]]
}

function isOpen(day,properties) {
    let openingTimes;
    switch(day) {
        case "Sunday":
            openingTimes = properties.opening_times_su;
            break;
        case "Saturday":
            openingTimes = properties.opening_times_sa;
            break;
        case "Friday":
            openingTimes = properties.opening_times_fr;
            break;
        default:
            openingTimes = properties.opening_times_mo_to_th;
    }
    openingTimes = (openingTimes) ? JSON.parse(openingTimes.replace(":",",")) : [25,26];
    openingTimes[1] = (openingTimes[1]<openingTimes[0]) ? openingTimes[1] + 23 : openingTimes[1];
    let hour = this.preferences.hour;
    return (hour>=openingTimes[0] && hour<openingTimes[1]);
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
    wayPoints = []
    routing.setWaypoints(wayPoints)
    for (var i in points) {
        console.log(L.latLng(Number(points[i][0]), Number(points[i][1])))
        wayPoints.push(L.latLng(Number(points[i][0]), Number(points[i][1])))
    }
    console.log(wayPoints)
    routing.setWaypoints(wayPoints);
}
function analystSymbol(latlng, selected, capa, currOcc, style, red, green) {
    if (currOcc != -1) {
        return L.marker(latlng, {
            icon: L.canvasIcon({
                iconSize: [40, 40],
                iconAnchor: [20, 20],
                drawIcon: function (icon, type) {
                    if (type == 'icon') {
                        var ctx = icon.getContext('2d');
                        var lastend = -1.5708;
                        var data = [capa - currOcc, currOcc]; // If you add more data values make sure you add more colors
                        var myTotal = 0; // Automatically calculated so don't touch
                        let myColor = [red, green];
                        for (var e = 0; e < data.length; e++) {
                            myTotal += data[e];
                        }

                        for (var i = 0; i < data.length; i++) {
                            ctx.fillStyle = myColor[i];
                            ctx.beginPath();
                            var size = L.point(this.options.iconSize);
                            ctx.moveTo(Math.floor(size.x / 2), Math.floor(size.y / 2));
                            // Arc Parameters: x, y, radius, startingAngle (radians), endingAngle (radians), antiClockwise (boolean)
                            ctx.arc(size.x / 2, size.y / 2, (size.y - 3) / 2, lastend, lastend + (Math.PI * 2 * (data[i] / myTotal)), false);
                            ctx.lineTo(Math.floor(size.x / 2), Math.floor(size.y / 2));
                            ctx.fill();
                            if (selected) {
                                ctx.beginPath();
                                ctx.arc(size.x / 2, size.y / 2, (size.y - 2) / 2, 0, 2 * Math.PI);
                                ctx.strokeStyle = '#0046db';
                                ctx.lineWidth = 2;
                                ctx.stroke();
                            }
                            lastend += Math.PI * 2 * (data[i] / myTotal);
                        }
                    }
                }
            })
        });
    } else {
        let html;
        if(!selected) {
            html = '<span class="fa-stack-4x" style="display:flex;justify-content:center;align-items:center;">' +
                '<i class="fas fa-info-circle fa-stack-2x" style="color:' + style.getPropertyValue('--no-data') + ';font-size: 3em;"></i>' +
                '<i class="fas fa-info fa-stack-2x" style="color: white;font-size: 1.5em;"></i>' +
                '<i class="fas fa-slash fa-stack-1x" style="color: white;font-size: 1.5em;"></i>' +
                '</span>'
        } else {
            html = '<span class="fa-stack-4x" style="display:flex;justify-content:center;align-items:center;">' +
                '<i class="fas fa-circle fa-stack-2x" style="color:#0046db;-webkit-text-stroke-width: 4px;\n' +
                '-webkit-text-stroke-color: #0046db;font-size: 3em;"></i>' +
                '<i class="fas fa-info-circle fa-stack-2x" style="color:' + style.getPropertyValue('--no-data') + ';font-size: 3em;"></i>' +
                '<i class="fas fa-slash fa-stack-2x" style="color: #0046db;font-size: 1.5em;"></i>' +
                '</span>'
        }

        return L.marker(latlng, {
            icon: L.divIcon({
                html: html,
                iconSize: [40, 40],
                iconAnchor: [20, 0],
                className: 'myDivIcon'
            })
        });
    }
}

function basicSymbol(latlng, parkride, open, gradient, rainbow, capa, currFree, selected, hovered, style) {
    let occPerc;
    if(currFree) {
        occPerc = currFree/capa
    } else {
        occPerc = 0;
    }
    let color;
    if (currFree == -1 || !open) {
        color = style.getPropertyValue('--no-data');
    } else {
        if (gradient) {
            if (parkride) {
                color = style.getPropertyValue('--has-capacity');
            } else {
                color = "#" + rainbow.colourAt(occPerc);
            }
        } else {
            if (parkride) {
                color = rgba2hex(this.preferences.greenColor);
            } else if (occPerc < 0.01) {
                color = rgba2hex(this.preferences.redColor);
            } else if (occPerc < 0.5) {
                color = rgba2hex(this.preferences.yellowColor);
            } else {
                color = rgba2hex(this.preferences.greenColor);
            }
        }
    }
    let symbol = (open) ? ((parkride) ? "fa-exchange-alt" : "fa-parking") : "fa-times"
    let html;
    if(!selected) {
        if (!hovered) {
            html = '<i class="fas ' + symbol + ' fa-2x" style="color:' + color + ';font-size: 3em;"></i>';
        } else {
            html = '<span class="fa-stack-4x">' +
            '<i class="fas fa-square fa-stack-2x" style="color:black;-webkit-text-stroke-width: 4px;\n' +
            '-webkit-text-stroke-color: black;font-size: 3em;"></i>' +
            '<i class="fas '+ symbol + ' fa-stack-2x" style="color:' + color + ';font-size: 3em;"></i>' +
            '</span>'
        }
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

function findOut() {
    console.log(geojson)
}
function rgba2hex(rgb){
    rgb = rgb.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return (rgb && rgb.length === 4) ? "#" +
        ("0" + parseInt(rgb[1],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[2],10).toString(16)).slice(-2) +
        ("0" + parseInt(rgb[3],10).toString(16)).slice(-2) : '';
}
