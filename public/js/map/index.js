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
let layers = L.layerGroup().addTo(map);
// Geocoder
L.control.geocoder('pk.267a89ad153e3cf0089b019ff949ac58').addTo(map);
/**
 * When the window is loaded the parking data is retrieved from the server and the visualized on the map.
 */
function init_map() {
    layers.clearLayers();
    let carParksArray = this.preferences.filteredParkingLots;
    let days = Object.keys(this.preferences.occupancy);
    var daySub = this.preferences.date.day,
        day = days.filter(function (str) { return str.indexOf(daySub) !== -1; })[0];
    let currOccupancy = this.preferences.occupancy[day][this.preferences.hour]
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
            let currFreeForFeature = (currOccupancy) ? currOccupancy[feature.properties.name] : 0;
            return (this.preferences.view !== "analyst") ?
                basicSymbol(latlng, true, rainbow, feature.properties.capacity, currFreeForFeature , feature.properties.index != this.preferences.selectedParkingLot, style)
                : analystSymbol(latlng, !(feature.properties.index != this.preferences.selectedParkingLot), feature.properties.capacity, currFreeForFeature, style);
        },
        onEachFeature: onEachFeature.bind(this)
    })
        .addTo(layers);
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
                    var myColor = [style.getPropertyValue('--no-capacity'), style.getPropertyValue('--has-capacity')]; // Colors of each slice

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

function basicSymbol(latlng, gradient, rainbow, capa, currFree, selected, style) {
    let occPerc;
    if(currFree) {
        occPerc = currFree/capa
    } else {
        occPerc = 0;
    }
    let color;
    if(gradient) {
        color = "#" + rainbow.colourAt(occPerc);
    } else {
        if(occPerc < 0.01) {
            color = style.getPropertyValue('--no-capacity');
        } else if (occPerc < 0.5) {
            color = style.getPropertyValue('--med-capacity');
        } else {
            color = style.getPropertyValue('--has-capacity');
        }
    }
    let html;
    if(selected) {
        html = '<i class="fas fa-parking fa-2x" style="color:' + color + '"></i>';
    } else {
        html = '<span class="fa-stack-4x">' +
            '<i class="fas fa-square fa-stack-2x" style="color:#0046db;-webkit-text-stroke-width: 4px;\n' +
            '-webkit-text-stroke-color: #0046db;"></i>' +
            '<i class="fas fa-parking fa-stack-2x" style="color:' + color + '"></i>' +
            '</span>'
    }
    return L.marker(latlng, {
        icon: L.divIcon({
            html: html,
            iconSize: [40, 40],
            iconAnchor: [12, 12],
            className: 'myDivIcon'
        })
    });
}
