var map;
window.addEventListener("DOMContentLoaded", function () {

    map = L.map('map');
    var osm;


    osm = new L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZGFyaWFqZXN1cyIsImEiOiJja3ByYW0xZ3YwNGlpMm9vNTJkdzNtZmd2In0.yrtnNnh0W0_oM8ja3b0sDw'
    }).addTo(map);

    map.setView([48.796199, 8.306520], 9);

    //Get own position

    navigator.geolocation.getCurrentPosition(function (location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

        var latitude = location.coords.latitude.toString();
        var longitude = location.coords.longitude.toString();
        var latitude2 = (location.coords.latitude + 0.001).toString();
        var longitude2 = (location.coords.longitude + 0.001).toString();

        map.setView(latlng, 10);

        var myPositionIcon = L.divIcon({ className: 'my-div-icon' });

        var markerPosition = L.marker(latlng, { icon: myPositionIcon }).addTo(map);
        getRidingStables(latitude, longitude, latitude2, longitude2);
    });

});

function getRidingStables(latitude, longitude, latitude2, longitude2) {
    var query = '?data=[out:json];node(' + latitude + ', ' + longitude + ', ' + latitude2 + ', ' + longitude2 + ');node(around:20000)[sport=equestrian];out;';
    var url = 'https://overpass-api.de/api/interpreter' + query;


    fetch(url)
        .then(response => response.json())
        .then(json => {
            var geojson = osmtogeojson(json);
            L.geoJSON(geojson, { onEachFeature: onEachFeature }).addTo(map);
        });
}


function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties.name != null) {
        layer.bindPopup(feature.properties.name);
    }
    else {
        layer.bindPopup("Entschuldigung, es wurde kein Name hinterlegt");
    }
}