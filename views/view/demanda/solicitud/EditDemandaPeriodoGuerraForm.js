
Ext.define('DTG.view.demanda.solicitud.EditDemandaPeriodoGuerraForm', {
    extend: 'Ext.window.Window',
    xtype: 'edit-demanda-periodo-guerra-form',

    title: 'Adicionar/Eliminar Periodo de Guerra asociado a la Demanda',
    iconCls: 'fa fa-rocket',
    layout: 'fit',
    width: 820,
    resizable: false,
    closable: false,
    modal: true,

    initComponent: function () {
        var me = this; me.myData = [];

        me.stateEvents = ['actioncolumnClick'];
        me.gridPeriodoGuerraStore = Ext.create('Ext.data.ArrayStore', {
            fields: [ 'id', 'etapa', 'descripcion' ]
        });
        me.items = [{
            xtype: 'form',
            padding: '10 10 10 10',
            items: [{
                xtype: 'container',
                layout: 'anchor',
                items: [{
                    xtype: 'container',
                    border: false,
                    layout: 'hbox',
                    items: [{
                        xtype: 'combobox',
                        emptyText: 'Periodo de Guerra',
                        store: Ext.create('DTG.store.PeriodoGuerraStore'),
                        queryMode: 'local',
                        displayField: 'etapa',
                        valueField: 'id',
                        flex: 1,
                        editable: false
                    }]
                },{
                    xtype: 'container',
                    border: false,
                    layout: 'fit',
                    margin: '3 0 0 0',
                    items: [{
                        xtype: 'grid',
                        border: true,
                        store: me.gridPeriodoGuerraStore,
                        columns: [
                            { text: 'Id', dataIndex: 'id', hidden: true, sortable: false, menuDisabled: true },
                            { text: 'Etapa',  dataIndex: 'etapa', flex: 1, sortable: false, menuDisabled: true },
                            { text: 'Descripción', dataIndex: 'descripcion', flex: 2, sortable: false, menuDisabled: true },
                            {
                                xtype: 'actioncolumn', width: 25,
                                sortable: false,
                                menuDisabled: true,
                                items: [{
                                    iconCls: 'delete-row',
                                    tooltip: 'Eliminar registro.',
                                    handler: function(grid, rowIndex){
                                        me.fireEvent('actioncolumnClick', [grid, rowIndex]);
                                    }
                                }]
                            }
                        ],
                        margin: '0 0 8 0'
                    }]
                }]
            }]
        }];
        me.buttons = [{
            text: 'Editar',
            iconCls: 'fa fa-check'
        },{
            text: 'Cancelar',
            iconCls: 'fa fa-times',
            handler: function(btn) {
                btn.up('window').close();
            }
        }];
        me.callParent(arguments);
    }
});