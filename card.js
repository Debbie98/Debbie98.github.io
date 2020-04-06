var map;
window.addEventListener("DOMContentLoaded", function () {

    document.getElementById("saarland").addEventListener("click", onClickSaarland);

    map = L.map('map');
    var latlng;
    var osm;
    var equestrian;

    //Get own position

    navigator.geolocation.getCurrentPosition(function (location) {
        latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

        map.setView(latlng, 10);


        osm = new L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
            minZoom: 0,
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
        }).addTo(map);


        var myPositionIcon = L.divIcon({ className: 'my-div-icon' });

        var markerPosition = L.marker(latlng, { icon: myPositionIcon }).addTo(map);
    });

});



function onClickSaarland() {

    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'equestrian.geojson');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
        if (xhr.status === 200) {
            L.geoJSON(JSON.parse(xhr.responseText), { onEachFeature: onEachFeature }).addTo(map);
        }
    };
    xhr.send();
}



function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties.name != null) {
        layer.bindPopup(feature.properties.name);
    }
    else {
        layer.bindPopup("Sorry, no name found");
    }
}