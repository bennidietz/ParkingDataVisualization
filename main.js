// initialise Leaflet map
var map = L.map("map", {}).setView([51.97, 7.63], 14);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);
// set the icon for car parks
const parkingIcon = L.divIcon({
	html: '<i class="fas fa-parking fa-2x"></i>',
	iconSize: [20, 20],
	className: 'myDivIcon'
});

/**
 * When the window is loaded the parking date is retrieved from the server
 */
window.onload = () => {
	loadCarParks()
		.then(function(carParksArray) {
			// save the extracted trees into the global variabel, so that future access is easier
			let carParksGeoJSON = constructGeoJSON(carParksArray);
			L.geoJSON(carParksGeoJSON,{
				pointToLayer: function (feature, latlng) {
					return L.marker(latlng, {icon: parkingIcon});
				},
				onEachFeature: onEachFeature
			})
				.addTo(map);
		});
};


/**
 * Load and interpret the trees from the geoJson file.
 * @returns promise to return a list of trees
 */
function loadCarParks() {
	return new Promise(function(resolve, reject) {
		var xhttp = new XMLHttpRequest();

		xhttp.onreadystatechange = function () {
			if (this.readyState === 4 && this.status === 200) {
				if (this.responseText.length === 0) {
					reject("The URL field or the content of the field is emtpy.");
				}
				resolve(JSON.parse(this.responseText));
			}
		};
		xhttp.open("GET", "/api?type=basedata", true);
		xhttp.send();
	});
}

function constructGeoJSON(carParksArray) {
	let resultingGeoJSON = {"type":"featureCollection", features: []};
	carParksArray.forEach((carPark) => {
		resultingGeoJSON.features.append({"type":"Feature",
			"properties":{title:"Im a car park!"},
			"geometry":{
				"type":"Point",
				"coordinates":[carPark[25],carPark[24]]
			}})
	})
	return resultingGeoJSON;
}

function onEachFeature(feature, layer) {
	layer.bindPopup(feature.properties.name);
}