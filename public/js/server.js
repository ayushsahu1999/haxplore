var directionsDisplay = new google.maps.DirectionsRenderer();
var directionsService = new google.maps.DirectionsService();
var map;
// var map2;

var starting = new google.maps.LatLng(26.484987, 80.273709);
var ending = new google.maps.LatLng(26.477799, 80.296700);
// var starting2 = new google.maps.LatLng(26.473889, 80.287476);
// var ending2 = new google.maps.LatLng(26.472160, 80.285824);
var mapOptions = {
    zoom: 14, // Sets the overall zoom of the map-canvas
    center: starting
};
map1 = new google.maps.Map(document.getElementById('map-canvas-server'), mapOptions);
directionsDisplay.setMap(map1);

// Contains the source and destination of individual markers
var request1 = {
    origin: starting,
    destination: ending,
    travelMode: 'DRIVING'
};

directionsService.route(request1, function(response, status) {
if (status == "OK") {
    //directionsDisplay.setDirections(response);
    // console.log('its dragged')
    var dict = JSON.stringify(response);
    console.log(dict);
    createPolyline(response);
}
});

line = null;
createPolyline(directionsDisplay.getDirections());
function createPolyline(directionResult) {
    console.log("Directions");
    console.log(directionResult);
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

        }]
    });
    var legs = directionResult.routes[0].legs;
    console.log('legs');
    console.log(directionResult.routes[0].legs);
    console.log('legs-length');
    console.log(legs.length);
    for (i = 0; i < legs.length; i++) {
        var steps = legs[i].steps;
        console.log("steps");
        console.log(steps);
        for (j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            for (k = 0; k < nextSegment.length; k++) {
                line.getPath().push(nextSegment[k]);
            }
        }
    }
    line.setMap(map1);
    console.log("This is line");
    console.log(line);
    animate();
    
};

function animate() {
    var count = 0;
    var status = document.getElementById("lat-lng");
    int = setInterval(function() {
        count++;// Decides the duration of the whole trip
        var icons = line.get('icons');
        icons[0].offset = (count) + '%';// count/20 reudces the speed of the moving marker
        //console.log("count then offset");
        //console.log(count);
       // console.log(icons[0].offset);
        //icons[1].offset = (count / 20) + '%';
        //icons[2].offset = (count/40) + '%';
      /*  for (j = 0; j < steps.length; j++) {
            var nextSegment = steps[j].path;
            for (k = 0; k < nextSegment.length; k++) {
                line.getPath().push(nextSegment[k]);
                console.log(`${k} is the line.getPath().push(nextSegment[k]);`)
                console.log(line.getPath().push(nextSegment[k]));
                console.log('nextSegment');
                console.log(nextSegment[k].lat());
            }
        }

        status.innerHTML = 
        */
       line.set('icons', icons);
    }, 100);
    console.log("This is int");
    console.log(int);
};
