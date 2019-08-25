function ret() {
    var directionsDisplay = new google.maps.DirectionsRenderer();
    var directionsService = new google.maps.DirectionsService();

    var starting = new google.maps.LatLng(25.268263, 82.982541);
    var ending = new google.maps.LatLng(25.278643, 82.998904);

    var mapOptions = {
      zoom: 14,
      center: starting
    }
    var map;
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    directionsDisplay.setMap(map);

    var ar = [];
    var a;

    var request = {  //making requests
      origin: starting,
      destination: ending,
      travelMode: 'DRIVING',
    }

    var marker = new google.maps.Marker({   //positions of markers
        position: new google.maps.LatLng(25.268263, 82.982541),
        map: map,
    });


    var line;
    var a;


var res;
      directionsService.route(request, function(response, status){  //getting response
        //console.log(response);
        if (status == "OK") {

            directionsDisplay.setDirections(response);  //displaying route
            //console.log(response);
            console.log('1');
            //document.getElementById('Gresponse').innerHTML = JSON.stringify(response);

            //console.log(a);
            createPolyline(response, callback);
            //disp();
        }
        //a =
        //console.log(a);
      }

    );

      //console.log(apg);



    //ret(disp);
    //console.log('1');




    function createPolyline(directionResult, callback) {


        line = null;
        var legs = directionResult.routes[0].legs;

        line = new google.maps.Polyline({
          path: [],
          strokeColor: '#ff0000',
          strokeOpacity: 0.5,
          strokeWeight: 4,
          icons: [{
            icon: {
              path: marker,
              scale: 15,
              strokeColor: '#393'
            },
            offset: '100%'
          }]
        });
        //console.log(legs);
        for (i = 0; i < legs.length; i++) {
            var steps = legs[i].steps;
            for (j = 0; j < steps.length; j++) {
                var nextSegment = steps[j].path;
                for (k = 0; k < nextSegment.length; k++) {
                    //console.log(nextSegment[k].lat()+", "+ nextSegment[k].lng());
                    ar.push(nextSegment[k].lat(), nextSegment[k].lng());  // getting array of lat & long
                    line.getPath().push(nextSegment[k]);

                }
            }
        }


        callback();
    };


    function callback() {
      animate();
    }

      //setting animation





    function animate() {
        var count = 0;
        var index = 0;

        int = setInterval(function() {
            count = (count + 1) % 10000; //resetting once finished
            var icons = line.get('icons');
            icons[0].offset = (count / 100) + '%'; //if n=2 then count modulus by n*100

            line.set('icons', icons);

            if (index < ar.length){
                marker.setPosition( new google.maps.LatLng(ar[index], ar[index+1]) );
                console.log(marker.getPosition().lat()+','+marker.getPosition().lng());
                //getDistance(marker.getPosition().lat(), marker.getPosition().lng());
                index = index + 2;
            }
          }, 24)

        };

      return ar;

}
var a1 = ret();
//ret();
setTimeout(function(){console.log(a1);}, 1000);
