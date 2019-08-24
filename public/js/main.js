var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map;

var starting = new google.maps.LatLng(26.484987, 80.273709);
var ending = new google.maps.LatLng(26.477799, 80.296700);
var starting2 = new google.maps.LatLng(26.473889, 80.287476);
var ending2 = new google.maps.LatLng(26.472160, 80.285824);
var mapOptions = {
    zoom: 14, // Sets the overall zoom of the map-canvas
    center: starting
};
map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
directionsDisplay.setMap(map);

// Contains the source and destination of individual markers
var request1 = {
    origin: starting,
    destination: ending,
    travelMode: 'DRIVING'
};

var request2 = {
    origin: starting2,
    destination: ending2,
    travelMode: 'DRIVING'
};

// Creates Polyline for requests
directionsService.route(request1, function(response, status) {
if (status == "OK") {
    //directionsDisplay.setDirections(response);
    console.log('its dragged')
    //document.getElementById('Gresponse').innerHTML = JSON.stringify(response);
    createPolyline(response);
}
});


directionsService.route(request2, function(response, status) {
if (status == "OK") {
    //directionsDisplay.setDirections(response);
    console.log('its dragged')
    //document.getElementById('Gresponse').innerHTML = JSON.stringify(response);
    createPolyline(response);
}
});

line = null;
createPolyline(directionsDisplay.getDirections());
function createPolyline(directionResult) {

    line = new google.maps.Polyline({
        path: [],
        strokeColor: '#bbbbbbb',// Decides the color of the route
        strokeOpacity: 0.5,
        strokeWeight: 4,
        icons: [{
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 20,// Represents the size of the marker
                strokeColor: '#393'// Color of the marker
            },
            offset: '100%'
        },
        {
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeColor: '#874331'
            },
            offset: '100%'
        },
        {
            icon: {
                path: google.maps.SymbolPath.CIRCLE,
                scale: 8,
                strokeColor: '#874331'
            },
            offset: '100%'
        }]
    });
    var legs = directionResult.routes[0].legs;
    console.log(directionResult.routes[0]);
    for (i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        for (j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            for (k = 0; k < nextSegment.length; k++) {
                line.getPath().push(nextSegment[k]);
            }
        }
    }
    line.setMap(map);
    animate();
};
function animate() {
    var count = 0;
    int = setInterval(function() {
        count = (count + 1) % 2000;// Decides the duration of the whole trip
        var icons = line.get('icons');
        icons[0].offset = (count / 20) + '%';// count/20 reudces the speed of the moving marker
        icons[1].offset = (count / 20) + '%';
        icons[2].offset = (count/40) + '%';
        line.set('icons', icons);
    }, 24);
};
