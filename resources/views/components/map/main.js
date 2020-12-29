// initialise Leaflet map
var map = L.map("map", {}).setView([51.97, 7.63], 14);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
// set the icon for car parks

/**
 * When the window is loaded the parking data is retrieved from the server and the visualized on the map.
 */
window.onload = () => {
	loadCarParks()
		.then(function(carParksArray) {
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
				onEachFeature: onEachFeature
			})
				.addTo(map);
		});
};


/**
 * Load the carparks from the server
 * @returns promise to return a list of a list
 */
function loadCarParks() {
	return new Promise(function(resolve, reject) {
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				if (this.responseText.length === 0) {
					reject("The URL field or the content of the field is emtpy.");
				}
				resolve(JSON.parse(this.responseText)["0"]);
			}
		};
		xhttp.open("GET", "https://gins.christian-terbeck.de/api?type=basedata", true);
		xhttp.send();
	});
}

function constructGeoJSON(carParksArray) {
	let resultingGeoJSON = {"type":"featureCollection", features: []};
	let names = carParksArray[0];
	carParksArray.forEach((carPark, i) => {
		if (i>0) {
			let temp = {
				"type": "Feature",
				"properties": {},
				"geometry": {
					"type": "Point",
					"coordinates": [carPark[25], carPark[24]]
				}
			}
			names.forEach((name,j) => {
				temp.properties[name] = carPark[j];
			})
			resultingGeoJSON.features.push(temp)
		}
	})
	return resultingGeoJSON;
}

/**
 * bind a popup to a given feature
 * @param feature
 * @param layer
 */
function onEachFeature(feature, layer) {
	layer.bindPopup(feature.properties.name);
}
