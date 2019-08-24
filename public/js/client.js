// TODO Generate Random Clients For The Prototype

var starting = new google.maps.LatLng(26.484987, 80.273709);
var ending = new google.maps.LatLng(26.477799, 80.296700);

var mapOptions = {
    zoom: 18, // Sets the overall zoom of the map-canvas
    center: starting
};
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
directionsDisplay.setMap(map);