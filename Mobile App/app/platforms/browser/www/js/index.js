'use strict';
var devicesNames = [];
var devicesR = [];
document.getElementById("log").innerHTML += "JS uploaded <br>";

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        document.getElementById("log").innerHTML += "Device ready started <br>";
        setInterval(app.refreshDeviceList(),2000);
        setInterval(app.refreshVal(),1000);
    },
    refreshDeviceList: function() {
        devicesNames = [];
        devicesR = [];
        document.getElementById("log").innerHTML += "Started scanning <br>";
        ble.scan([], 2, app.onDiscoverDevice, app.onError);
    },
    onDiscoverDevice: function(device) {
        document.getElementById("log").innerHTML += "Scanned device: ";
        document.getElementById("log").innerHTML += device.name;
        document.getElementById("log").innerHTML += " with rrsi: ";
        document.getElementById("log").innerHTML += device.rssi;
        document.getElementById("log").innerHTML += "<br>";
        devicesNames.push(device.name);
        devicesR.push(device.rssi);
    },
    refreshVal: function() {
        var ind = app.indexIT(devicesR);
        if(ind >= 0){
            var name = devicesNames[ind];
            if(name == "room"){
                document.getElementById("names").innerHTML = "Conference room";
                var image = document.getElementsByClassName("img1");
                image.src = "img/room.png"
            }
            if(name == "corr"){
                document.getElementById("names").innerHTML = "Corridor";
                var image = document.getElementsByClassName("img1");
                image.src = "img/corr.png"
            }
        }
    },
    onError: function(reason) {
        alert("ERROR: " + reason); // real apps should use notification.alert
    },
    indexIT: function(arr) {
        if (arr.length === 0) {
            return -1;
        }
    
        var max = arr[0];
        var maxIndex = 0;
    
        for (var i = 1; i < arr.length; i++) {
            if (arr[i] > max) {
                maxIndex = i;
                max = arr[i];
            }
        }
    
        return maxIndex;
    }
};