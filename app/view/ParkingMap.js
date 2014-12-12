Ext.define('BathLiveParking.view.ParkingMap', {
	extend: 'Ext.navigation.View',
    xtype: 'parkingmap',
	
    requires: [
        'BathLiveParking.view.CarParkDetails',
		'Ext.Map'
    ],
	
    config: {
		autoDestroy: true,
		
		navigationBar: {
            items: [
                {
                    xtype: 'button',
					id: 'btnRefresh',
                    text: 'Refresh',
                    align: 'left'
                }
            ],
            docked: 'top'
        },
		
		items: [
			{
				xtype: 'map',
				title: 'Bath Car Park Spaces',
				mapOptions: {
					mapTypeId: google.maps.MapTypeId.ROADMAP,
					zoom: 14
				},
				useCurrentLocation: false
			}
		]
    }
});
