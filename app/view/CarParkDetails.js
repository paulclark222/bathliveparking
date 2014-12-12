Ext.define('BathLiveParking.view.CarParkDetails', {
    extend: 'Ext.Container',
    xtype: 'carparkdetails',
    config: {
		styleHtmlContent:true,
        scrollable: true,		
        
        tpl: [
        '<div>{description}</div>',		
        '<div><label>Current Spaces: </label><span>{spaces}</span></div>',
        '<div><label>Capacity: </label><span>{capacity}</span></div>',
        '<div><label>Current Status: </label><span>{status}</span></div>'
        ].join(''),
		
		items: [
			{
				xtype: 'button',
				id: 'btnDirections',
				text: 'Get Directions'
			}
		]
    }
});