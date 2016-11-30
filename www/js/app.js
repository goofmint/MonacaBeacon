function onDeviceReady() {
    // 必要な権限を取得
    // 通知の権限
    cordova.plugins.notification.local.registerPermission(function() {
        console.log("Permitted.")
    });
    // 位置情報を取得。常に取得とします。
    cordova.plugins.locationManager.requestAlwaysAuthorization();
    
    // delegateの作成と設定
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
    
    // 監視するビーコンの作成
    var uuid = '00000000-0000-0000-0000-000000000000'; //ビーコンのUUID
    var identifier = 'shop001'; // 任意のID
    var beaconRegion = new cordova.plugins.locationManager.BeaconRegion(identifier, uuid);
    beaconRegion.notifyEntryStateOnDisplay = true;

    // 監視の開始
    cordova.plugins.locationManager.startRangingBeaconsInRegion(beaconRegion)
        .fail(console.error)
        .done();
        
    cordova.plugins.locationManager.startMonitoringForRegion(beaconRegion)
        .fail(function(e) { console.error(e); })
        .done();
}

document.addEventListener('deviceready', onDeviceReady, false);
