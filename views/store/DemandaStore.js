
Ext.define('DTG.store.DemandaStore', {
    extend: 'Ext.data.ArrayStore',

    autoLoad: true,
    groupField: 'periodo_guerra',
    fields: ['id', 'fecha_solicitud', 'fecha_demanda', 'acronimo', 'empresa', 'empresa_id', 'periodo_guerra',
        { name: 'cantidad_servicio', type: 'int' },
        { name: 'cantidad_producto', type: 'int' },
        'solicitante', 'aprobado_por', 'periodo_guerra_ids', 'estado'
    ],
    listeners: {
        load: function () {
            var date = new Date();
            DTG.Repository.Demanda.findByYear(String(date.getFullYear()), this);
        }
    }
});