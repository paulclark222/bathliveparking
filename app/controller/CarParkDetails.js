Ext.define('BathLiveParking.controller.CarParkDetails', {
    extend: 'Ext.app.Controller',
	
    config: {
        refs: {
			btnDirections: '#btnDirections',
			carParkDetailsContainer: 'carparkdetails',			
			mapComponent: 'map'
        },
		
        control: {
			btnDirections: {
				tap: 'onDirections'
			}
        }
	},
	
	onDirections: function() {
		var carParkData = this.getCarParkDetailsContainer().getData();
		
		var mapLink = Ext.String.format('geo:{0},{1}', carParkData.location.latitude, carParkData.location.longitude);
		window.location.href = mapLink;
	}
});