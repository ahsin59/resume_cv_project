function initMap() {
    var APIKey = "AIzaSyD50Cf8z1w1f_pxvRR1vr-_EPc3yP0Qpnc";
    var map = new google.maps.Map(document.getElementById("map"), {
        zoom: 3,
        center: {
            lat: 46.619261,
            lng: -33 - 134766
        }
    });

    var labels = "ABCDEFGHIJKLMNÑOPQRSTUVXYZ";

    var locations = [
        { lat: 40.785091, lng: -73.968285 },
        { lat: 41.084045, lng: -73.874245 },
        { lat: 40.754932, lng: -73.984016 }
    ];

    /*map its a JS method and can take up to three arguments and work similar to a for each( ) function*/
    /*arguments = location is the current value where we are in the array and the "i" is the index number*/
    var markers = locations.map(function (location, i) {
        return new google.maps.Marker({/*Get one of the strings out of the labels we created*/
            position: location,
            label: labels[i % labels.length]
            /*The reason for using the %operator is so that if we have more than 26 locations, then it will loop around to the start of our string again and go from Z back to A, instead of throwing an error.*/
        });
    });

    // Add a marker clusterer to manage the markers.
    var markerCluster = new MarkerClusterer(map, markers,
        { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });

}
