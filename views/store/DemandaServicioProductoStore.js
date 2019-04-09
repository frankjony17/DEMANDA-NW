
Ext.define('DTG.store.DemandaServicioProductoStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    fields: ['id', 'um', 'tipo', 'servicio_producto', 'demanda_id', 'servicio_producto_id'],
    listeners: {
        load: function () {
            var me = this, data = [];

            DTG.Model.DemandaServicioProducto.findAll({
                include: [{
                    model: DTG.Model.ServicioProducto
                }],
                where: {
                    demanda_id: me.demandaId
                }
            }).then(function(record){
                record.forEach(function(rec){
                    var serProd = rec.get('ServicioProducto');
                    data.push({
                        "id": rec.get('id'),
                        "um": rec.get('um'),
                        "tipo": serProd.tipo,
                        "servicio_producto": serProd.nombre,
                        "demanda_id": rec.get('demanda_id'),
                        "servicio_producto_id": rec.get('servicio_producto_id')
                    });
                });
                me.loadData(data);
            });
        }
    }
});