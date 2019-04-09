
Ext.define('DTG.view.demanda.solicitud.ServicioProductoGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'solicitud-servicio-producto-grid',

    width: '100%',
    height: 210,
    border: true,
    selType: 'checkboxmodel',
    stateful: true,
    autoScroll: true,
    scrollable: 'vertical',

    initComponent: function () {
        var me = this;
        this.store = Ext.create('DTG.store.DemandaServicioProductoStore', { demandaId: this.demandaId});
        this.cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 2
        });
        this.stateEvents = ['actioncolumn'];
        this.plugins = [this.cellEditing];
        this.columns = [{
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true,
            sortable: false,
        },{
            text: '<center>Servicio/Producto</center>',
            dataIndex: 'servicio_producto',
            editor: {
                xtype: 'combobox',
                emptyText: 'Servicios o Productos',
                store: Ext.create('DTG.store.ServicioProductoStore'),
                queryMode: 'local',
                displayField: 'nombre',
                editable: false,
                listConfig: {itemTpl:['<div data-qtip="{descripcion}">{nombre} <b>({tipo})</b></div>']}
            },
            sortable: false,
            menuDisabled: true,
            flex: 5
        },{
            text: 'UM',
            dataIndex: 'um',
            align: 'center',
            editor: {
                xtype: 'textfield'
            },
            sortable: false,
            flex: 1
        },{
            text: 'Tipo',
            dataIndex: 'tipo',
            width: 60,
            align: 'center',
            sortable: false,
            menuDisabled: true,
            renderer : function(val) {
                if(val) {
                    if (val.trim() === 'Servicio') {
                        return '<span style="color: #3e5188"><b>S</b></span>';
                    } else if (val.trim() === 'Producto') {
                        return '<span style="color: #3e5188"><b>P</b></span>';
                    }
                } else { return ""; }
            }
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
        }];
        this.rbar = [{
            xtype: 'button',
            iconCls: 'fa fa-plus',
            tooltip: 'Acignar Servicios y Productos',
            name: 'add'
        },{
            tooltip: 'Actualizar',
            iconCls: 'fa fa-refresh',
            handler: function() {
                me.store.load();
            }
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