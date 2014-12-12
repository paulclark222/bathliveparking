Ext.define('BathLiveParking.store.CarPark', {
    extend: 'Ext.data.Store',
    config: {        
		model: 'BathLiveParking.model.CarPark',		
		sorters: ['name']
    }
});