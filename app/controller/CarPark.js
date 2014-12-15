Ext.define('BathLiveParking.controller.CarPark', {
    extend: 'Ext.app.Controller',
	
    config: {
        refs: {
			btnDirections: '#btnDirections',
			carParkDetailsContainer: 'carpark',			
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
		
		//var mapLink = Ext.String.format('http://maps.google.com/maps?q={0},{1}&z=16', carParkData.location.latitude, carParkData.location.longitude);
		var mapLink = Ext.String.format('geo:{0},{1}?q={0},{1}(CarPark)', carParkData.location.latitude, carParkData.location.longitude);
		window.location = mapLink;
	}
});