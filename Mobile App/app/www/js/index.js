'use strict';
var room = -1000;
var corr = -1000;

var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.refreshDeviceList();
    },
    refreshDeviceList: function() {
        setInterval(function(){app.refreshVal();ble.scan([], 2, app.onDiscoverDevice, app.onError);}, 3000);
    },
    onDiscoverDevice: function(device) {
        if(device.name == "room"){
            room = device.rssi;
        }
        if(device.name == "corr"){
            corr = device.rssi;
        }
    },
    refreshVal: function() {

        if(room>corr){
            document.getElementById("names").innerHTML = "Conference room";
            document.getElementById('MyImage').src = "img/room.png";
        }
        if(corr>room){
            document.getElementById("names").innerHTML = "Corridor";
            document.getElementById('MyImage').src = "img/corr.png";
        }
        room = -1000;
        corr = -1000;
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