
Ext.define('DTG.view.demanda.solicitud.IdentificacionServicioGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'identificacion-servicio-grid',

    width: '100%',
    height: 260,
    border: true,
    selModel: {
        type: 'cellmodel'
    },
    stateful: true,
    autoScroll: true,
    scrollable: 'vertical',

    initComponent: function () {
        var me = this;
        this.store = Ext.create('DTG.store.DemandaIdentificacionServicioStore');
        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        });
        this.stateEvents = ['actioncolumn'];
        this.plugins = [this.cellEditing];
        this.columns = [{
            xtype: 'rownumberer',
            text: 'No',
            width: 45,
            align: 'center',
            sortable: false
        },{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true,
            align: 'center',
            sortable: false
        },{
            text: '<center>Identificación</center>',
            dataIndex: 'identificacion',
            editor: {
                xtype: 'textfield'
            },
            sortable: false,
            flex: 5
        },{
            text: '<center>Dirección Postal</center>',
            dataIndex: 'direccion_postal',
            editor: {
                xtype: 'textfield'
            },
            sortable: false,
            flex: 8
        },{
            text: 'Plazo',
            align: 'center',
            menuDisabled: true,
            sorter: false,
            sortable: false,
            columns: [{
                text: 'Solicitado',
                dataIndex: 'plazo_solicitado',
                formatter: 'date("Y-m-d")',
                editor: {
                    xtype: 'datefield',
                    value: new Date(),
                    format: 'Y-m-d',
                    editable: false
                },
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                text: 'Aprobado',
                dataIndex: 'plazo_aprobado',
                formatter: 'date("Y-m-d")',
                editor: {
                    xtype: 'datefield',
                    value: new Date(),
                    minValue: new Date(),
                    format: 'Y-m-d',
                    editable: true
                },
                menuDisabled: true,
                sortable: false,
                width: 90
            },{
                xtype: 'actioncolumn',
                width: 30,
                align: 'center',
                sortable: false,
                menuDisabled: true,
                items: [{
                    iconCls: 'delete-row',
                    tooltip: 'Eliminar registro',
                    handler: function (grid, rowIndex) {
                        var rec = grid.getStore().getAt(rowIndex);
                        me.fireEvent('actioncolumn', rec);
                    }
                }]
            },{
                text: 'DPI',
                dataIndex: 'demanda_plazo_id',
                width: 35,
                hidden: true,
                sortable: false
            },{
                text: 'Id',
                dataIndex: 'id',
                width: 35,
                hidden: true,
                sortable: false
            }]
        }];
        this.rbar = [{
            xtype: 'button',
            iconCls: 'fa fa-plus',
            name: 'add',
            tooltip: 'Acignar Identificación al Servicio o Producto'
        },{
            tooltip: 'Actualizar',
            iconCls: 'fa fa-refresh',
            name: 'load'
        },'-',{
            xtype: 'button',
            iconCls: 'fa fa-question',
            tooltip: 'Ayuda general'
        },'->',{
            xtype: 'button',
            iconCls: 'fa fa-compress',
            tooltip: 'Recoger panel',
            name: 'collapse'
        }];
        this.callParent();
    }
});