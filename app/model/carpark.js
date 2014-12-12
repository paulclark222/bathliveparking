Ext.define('BathLiveParking.model.CarPark', {
    extend: 'Ext.data.Model',

    config: {
        idProperty: 'id',
        fields: ['id', 'lastupdate', 'location', 'percentage', 'status', 'description', 'name', 'capacity', 'occupancy',
			// calculated fields			
			{	
				name: 'spaces', type: 'int', persist: false,
				convert: function(v, record) {
					var data = record.getData();
					var spaces = data.capacity - data.occupancy;
					return spaces < 0 ? 0 : spaces;
				}
			},
			{
				name: 'isFull', type: 'boolean', persist: false,
				convert: function(v, record) {
					var data = record.getData();
					return data.spaces < 1;
				}
			}
			
			],
        proxy: {
            type: 'rest',
            url : 'getparkingdata',
            reader: {
                type: 'json',
                rootProperty: ''
            }
        }
    }
});