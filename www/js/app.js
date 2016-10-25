// This is a JavaScript file
function onDeviceReady() {
	cordova.plugins.notification.local.registerPermission(function() {
		console.log("Permitted.")
	});
	cordova.plugins.locationManager.requestAlwaysAuthorization();
	
	var delegate = new cordova.plugins.locationManager.Delegate();
	delegate.didDetermineStateForRegion = function(pluginResult) {
	  console.log('didDetermineStateForRegion', pluginResult);
	}
	delegate.didStartMonitoringForRegion = function(pluginResult) {
	  console.log('didDetermineStateForRegion', pluginResult);
	}
	
	delegate.didRangeBeaconsInRegion = function(pluginResult) {
		document.getElementById("log").value = JSON.stringify(pluginResult);
	}
	
	delegate.didEnterRegion = function(pluginResult) {
	  cordova.plugins.notification.local.add({
		  title: "いらっしゃいませ",
		  text: "アプリを立ち上げてクーポンをゲットしてください"
	  });
	}
	delegate.didExitRegion = function(pluginResult) {
	  cordova.plugins.notification.local.add({
		  id: 100,
		  title: "ご来店ありがとうございました",
		  text: "またのお越しを楽しみにしております。"
	  });
	}
	
	cordova.plugins.locationManager.setDelegate(delegate);
	var uuid = '82765E7C-92DC-1801-88C1-001C4D9AC0EB'; // mandatory
	var identifier = '0006E980'; // mandatory
	var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);
	beaconRegion.notifyEntryStateOnDisplay = true;
	
	cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
    .then()
    .fail(console.error);
	cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
    .fail(function(e) { console.error(e); })
    .done();
  
}

document.addEventListener('deviceready', onDeviceReady, false);
