// initialise Leaflet map for scrolly B
var map = L.map("map", {}).setView([51.97, 7.63], 13);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

// SVG overlay for mapB
L.svg().addTo(map);

var overlay = d3.select(map.getPanes().overlayPane);
var svg = overlay.select("svg");


d3.json('https://www.stadt-muenster.de/ows/mapserv706/odalkisserv?REQUEST=GetFeature&SERVICE=WFS&VERSION=2.0.0&TYPENAME=ms%3Agemarkungen&OUTPUTFORMAT=GEOJSON&EXCEPTIONS=XML&MAXFEATURES=1000&SRSNAME=EPSG%3A4326').then(function(bb) {
	let width = 200, height = 200;
	let projection = d3.geoEqualEarth();
	projection.fitSize([width, height], bb);
	var transform = d3.geoTransform({point: projectPoint})
	let geoGenerator = d3.geoPath()
		.projection(transform);

	svg.append('g').selectAll('path')
		.data(bb.features)
		.join('path')
		.attr('d', geoGenerator)
		.attr('fill', 'transparent')
		.attr('stroke', '#000');
});

function projectPoint(x, y) {
	var point = map.latLngToLayerPoint(new L.LatLng(y, x));
	this.stream.point(point.x, point.y);
}