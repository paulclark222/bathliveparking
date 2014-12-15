Ext.define('BathLiveParking.view.CarPark', {
    extend: 'Ext.Container',
    xtype: 'carpark',
    config: {
		layout: 'vbox',
		styleHtmlContent: false,
        scrollable: false,
		title: 'Details',
		items: [
			{
				xtype: 'carparkdetails',
				flex: 1
			},
			{
				xtype: 'button',
				id: 'btnDirections',
				text: 'Get Directions'
			}			
		]
    },
	
	setData: function(newData) {
		this.down('carparkdetails').setData(newData);
	},
	
	getData: function() {
		return this.down('carparkdetails').getData();
	}
});