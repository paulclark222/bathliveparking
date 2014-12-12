Ext.define('BathLiveParking.controller.ParkingMap', {
    extend: 'Ext.app.Controller',
    
	statics: {	
		getCarParkBackgroundColor: function(carParkData) {
			var result;
			
			if (carParkData.isFull) {
				result = 'red';
			} else if (carParkData.percentage > 90) {
				result = '#FF6600';
			} else {
				result = 'green';
			}
				
			return result;
		},
	},
	
    config: {
        refs: {
			parkingMapNav: 'parkingmap',
			mapComponent: 'map',
			btnRefresh: '#btnRefresh'	
        },
		
        control: {
			btnRefresh: {
				tap: 'refreshCarParks'
			}
        },
		
		carParkMarkers: [],
		
		infoBubble: null
    },
		
	launch: function() {
		var self = this;
		var mapComponent = this.getMapComponent();
		var map = mapComponent.getMap();
		
		// default centre on Bath
		map.panTo(new google.maps.LatLng(51.381613, -2.3624701));
		
		// create info bubble
		var infoBubble = new InfoBubble({
            hideCloseButton: true,
            disableAutoPan: true,
            maxHeight: 110
        });
		
		this.setInfoBubble(infoBubble);
		
		google.maps.event.addListener(map, 'mousedown', 
			function(){
				infoBubble.close();
			}
		);
		
		this.refreshCarParks(function() {
			self.centerMapOnMarkers();
		});	
	},
	
	centerMapOnMarkers: function() {			
		var mapComponent = this.getMapComponent();
		var map = mapComponent.getMap();
				
		// collect all points to center around
		var allMarkerPoints = new google.maps.LatLngBounds();
						
		var markers = this.getCarParkMarkers()
		for (var i = 0; i < markers.length; i++) {
			// add to bounds
			allMarkerPoints.extend(markers[i].getPosition());
		}
		
		// centre map on all markers
		map.fitBounds(allMarkerPoints);
	},
	
	clearCarParkMarkers: function() {
		var markers = this.getCarParkMarkers()
		for (var i = 0; i < markers.length; i++) {
			markers[i].setMap(null);
		}
		
		this.setCarParkMarkers([]);
	},	
	
	refreshCarParks: function(callback) {
		var self = this;
		var carParks = Ext.getStore('CarPark');		
		var mapComponent = this.getMapComponent();
		var map = mapComponent.getMap();
		
		// clear existing markers
		this.clearCarParkMarkers();
		
		// load car parks store			
		Ext.Viewport.setMasked({
			xtype:'loadmask', message:'Refreshing' 
		});
		
		carParks.load({
			callback: function(records, options, success) {
				Ext.Viewport.setMasked(false);				
				
				// create marker for each car park
				for(var i = 0; i < records.length; i++) {
					var carParkData = records[i].data;
															
					// create markers
					var position = new google.maps.LatLng(carParkData.location.latitude, carParkData.location.longitude);
					var marker = new MarkerWithLabel({
						map: map,
						position: position,
						visible: true,
						labelContent: carParkData.isFull ? 'FULL' : carParkData.spaces,
						labelAnchor: new google.maps.Point(22, 0),
						labelClass: 'carparklabel',
						labelStyle: {
							backgroundColor: BathLiveParking.controller.ParkingMap.getCarParkBackgroundColor(carParkData)
						}
					});				
					
					// add to control list
					self.getCarParkMarkers().push(marker);
										
					// set car park data on marker
					marker.carParkData = carParkData					
					
					var infoBubble = self.getInfoBubble();
					
					google.maps.event.addListener(marker, 'click', function() {
                        map.panTo(this.position);      

						// update content
						infoBubble.setContent([
                            '<div class="infobox">' , 
								'<div class="content">',
									this.carParkData.name,
								'</div>',
								'<img src="resources/images/arrow.png">',
                            '</div>'
                            ].join(''));							
							
						// change listener to pass new car park data
						google.maps.event.clearListeners(infoBubble.bubble_, 'click');
                        google.maps.event.addDomListener(infoBubble.bubble_, 'click', 
							(function(data) {
								return function(e){
									self.onCarParkSelected(data);
								}
							})(this.carParkData)
						);
						
						// open bubble
                        infoBubble.open(map, this);
					});
				}
				
				if (callback && typeof(callback) == 'function') {
					callback();
				}
			}
		});
	},
			
	onCarParkSelected: function(carParkData) {
		this.getParkingMapNav().push({
			xtype: 'carparkdetails',
			title: carParkData.name,
			data: carParkData,
			scrollable: true,
			styleHtmlContent: true
		});
	}	
});