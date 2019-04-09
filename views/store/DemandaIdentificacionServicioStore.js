
Ext.define('DTG.store.DemandaIdentificacionServicioStore', {
    extend: 'Ext.data.ArrayStore',

    //autoLoad: true,
    fields: ['id', 'identificacion', 'direccion_postal', 'plazo_solicitado', 'plazo_aprobado', 'demanda_plazo_id', 'demanda_servicio_producto_id'],

    loadStore: function (id) {
        var me = this, data = [];

        DTG.Model.DemandaServicioIdentificacion.findAll({
            include: [{
                model: DTG.Model.DemandaServicioProducto
            },{
                model: DTG.Model.DemandaPlazo
            }],
            where: {
                demanda_servicio_producto_id: id
            }
        }).then(function(record){
            record.forEach(function(rec){
                var plaso = rec.get('DemandaPlazo');
                data.push({
                    "id": rec.get('id'),
                    "identificacion": rec.get('identificacion'),
                    "direccion_postal": rec.get('direccionPostal'),
                    "plazo_solicitado": plaso.get('plazoSolicitado'),
                    "plazo_aprobado": plaso.get('plazoAprobado'),
                    "demanda_plazo_id": rec.get('demanda_plazo_id'),
                    "demanda_servicio_producto_id": rec.get('demanda_servicio_producto_id')
                });
            });
            me.loadData(data);
        });
    }
});