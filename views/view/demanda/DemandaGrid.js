
Ext.define('DTG.view.demanda.DemandaGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'demanda-grid',

    width: '100%',
    border: false,
    multiSelect: true,
    stateful: true,
    autoScroll: true,
    scrollable: 'vertical',
    features: [{
        groupHeaderTpl: [
            '{name:this.upper} (Periodo de Guerra)', {
                upper: function (name) {
                    return "<b>"+ name.toUpperCase() +"</b>";
                }
            }
        ],
        ftype: 'groupingsummary',
        collapsible: true
    }],

    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.DemandaStore');
        this.modelName = 'Demanda';

        this.viewConfig = {
            getRowClass: function(record) {
                if (record.get('estado') === 'PENDIENTE') {
                    return 'x-grid-row-color-pendiente';
                }
            }
        };
        this.columns = [{
            xtype: 'rownumberer',
            text: 'No',
            width: 45,
            align: 'center'
        },{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        },{
            text: 'Empresa',
            columns: [{
                text: '<center>Acrónimo</center>',
                dataIndex: 'acronimo',
                menuDisabled: true,
                width: 100
            },{
                text: '<center>Nombre</center>',
                dataIndex: 'empresa',
                width: 370
            }]
        },{
            text: 'Fecha de<br>Solicitud',
            dataIndex: 'fecha_solicitud',
            formatter: 'date("Y-m-d")',
            align: 'center',
            flex: 1
        },{
            text: 'Cantidad (S/P)',
            columns: [{
                text: 'Servicios',
                dataIndex: 'cantidad_servicio',
                menuDisabled: true,
                sorter: false,
                renderer: function(val) {
                    if (!val) {
                        return '<span style="color:red;"><b>0</b></span>';
                    } else {
                        return '<span style="color:green;"><b>'+ val +'</b></span>';
                    }
                },
                align: 'center',
                width: 85
            },{
                text: 'Productos',
                dataIndex: 'cantidad_producto',
                menuDisabled: true,
                sorter: false,
                renderer: function(val) {
                    if (!val) {
                        return '<span style="color:red;"><b>0</b></span>';
                    } else {
                        return '<span style="color:green;"><b>'+ val +'</b></span>';
                    }
                },
                align: 'center',
                width: 85
            }]
        },{
            text: '<center>Periodo <br>de Guerra</center>',
            dataIndex: 'periodo_guerra',
            flex: 2
        },{
            xtype: 'actioncolumn',
            text: 'Ver',
            width: 45,
            align: 'center',
            menuDisabled: true,
            items: [{
                iconCls: 'show-demandas',
                tooltip: 'Mostrar Servicios y Productos demandados',
                handler: function(grid, rowIndex) {
                    var rec = grid.getStore().getAt(rowIndex),
                        dat = new Date(rec.get('fecha_solicitud')),
                        solicitanteStore = Ext.create('DTG.store.PersonaStore'),
                        personaApruStore = Ext.create('DTG.store.PersonaStore');
                    /* Filter PersonaStore by type */
                    solicitanteStore.filter({property: 'empresa', value: rec.get('empresa')});
                    solicitanteStore.filter({property: 'tipo_persona', value: 'Usuario'});
                    personaApruStore.filter({property: 'tipo_persona', value: 'Trabajador'});
                    /* Create new Windows Solicitud */
                    Ext.create('DTG.view.demanda.solicitud.SolicitudWindow', {
                        title: 'Demanda '+ dat.getFullYear() +' >> <b>'+ rec.get('empresa') +' ('+ rec.get('acronimo') +')<b/>',
                        store: grid.getStore(),
                        empresa: rec.get('empresa'),
                        demandaId: rec.get('id'),
                        solicitante: rec.get('solicitante'),
                        aprobado_por: rec.get('aprobado_por'),
                        personaApruStore: personaApruStore,
                        solicitanteStore: solicitanteStore
                    });
                }
            }]
        },{
            text: 'EmpresaId',
            dataIndex: 'empresa_id',
            width: 35,
            hidden: true
        },{
            text: 'Ids',
            dataIndex: 'periodo_guerra_ids',
            width: 35,
            hidden: true
        },{
            text: 'Estado',
            dataIndex: 'estado',
            width: 45,
            hidden: true
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar demanda',
            iconCls: 'fa fa-plus'
        },'-',{
            tooltip: 'Filtrar demanda',
            iconCls: 'fa fa-search',
            name: 'search'
        },'->',{
            tooltip: 'Actualizar',
            iconCls: 'fa fa-refresh',
            name: 'refresh'
        }];
        this.callParent();
    }
});