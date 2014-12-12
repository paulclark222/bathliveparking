Ext.define('BathLiveParking.view.CarParkDetails', {
    extend: 'Ext.Container',
    xtype: 'carparkdetails',
    config: {
		styleHtmlContent: true,
		scrollable: false,
        
        tpl: [
        '<h3>{name}</h3>',	
        '<p>{description}</p>',		
        '<div class="cp_detail_item"><label>Capacity: </label><span>{capacity}</span></div>',
        '<div class="cp_detail_item"><label>Current Spaces: </label><span>{spaces}</span></div>',
        '<div class="cp_detail_item"><label>Current Status: </label><span>{status}</span></div>'
        ].join('')
    }	
});