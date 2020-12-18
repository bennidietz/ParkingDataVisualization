// initialise Leaflet map
var map = L.map("map", {}).setView([51.97, 7.63], 14);
L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
	attribution:
		'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
}).addTo(map);

const fontAwesomeIcon = L.divIcon({
	html: '<i class="fas fa-parking fa-2x"></i>',
	iconSize: [20, 20],
	className: 'myDivIcon'
});

var features = { "type":"featureCollection", features: [
		{
			"type":"Feature",
			"properties":{data:[10,12,16,20,25,30,30,29,13,10,7,6],title:"Injuries Due to Swan Bite by Month"},
			"geometry":{
				"type":"Point",
				"coordinates":[7.626812,51.965812]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.632062,51.964437]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7,616812,51,965688]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.616938,51.964437]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.617313,51.962688]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.622580,51.960840]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.619438,51.959437]
			}
		}
		,
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.626313,51.959812]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.630062,51.960812]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.630187,51.959812]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.637812,51.957563]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.631312,51.955813]
			}
		}
		,
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.632938,51.955562]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.636313,51.949687]
			}
		},
		{
			"type": "Feature",
			"properties": {data:[100,112,130,200,210,190,170,160,150,140,110,100],title:"Some Statistic"},
			"geometry": {
				"type": "Point",
				"coordinates": [7.639812,51.949188]
			}
		}
	]};

function onEachFeature(feature, layer) {
	layer.bindPopup(feature.properties.name);
}

L.geoJSON(features,{
	pointToLayer: function (feature, latlng) {
		return L.marker(latlng, {icon: fontAwesomeIcon});
	},
	onEachFeature: onEachFeature
})
	.addTo(map);