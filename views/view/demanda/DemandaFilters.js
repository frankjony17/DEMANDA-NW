
Ext.define('DTG.view.demanda.DemandaFilters', {
    extend: 'Ext.window.Window',
    xtype: 'filtro-demanda-form-windows',
    id: 'filtro-demanda-form-windows',

    iconCls: 'fa fa-search',
    layout: 'fit',
    resizable: false,
    autoShow: true,
    draggable: false,
    headerPosition: 'bottom',
    collapsible: true,
    titleCollapse: true,

    initComponent: function ()
    {
        var me = this; me.tagStore = Ext.create('Ext.data.Store',{fields:['id','value', 'data']}); me.tagData = [], me.ids = [];

        this.tbar = [{
            xtype: 'buttongroup',
            items: [{
                text: 'Sector',
                iconCls: null,
                menu: me.secMenu
            },{
                text: 'Organismo',
                iconCls: null,
                menu: me.orgMenu
            },{
                text: 'Empresa',
                iconCls: null,
                menu: me.empMenu
            }]
        },{
            xtype: 'buttongroup',
            items: [{
                text: 'Fecha de solicitud',
                iconCls: null,
                menu: me.datMenu
            },{
                text: 'Servicio',
                iconCls: null,
                menu: me.serMenu
            },{
                text: 'Producto',
                iconCls: null,
                menu: me.proMenu
            }]
        },{
            xtype: 'buttongroup',
            items: [{
                text: 'Periodo de Guerra',
                iconCls: null,
                menu: me.perMenu
            }]
        },'->',{
            xtype: 'buttongroup',
            items: [{
                tooltip: 'Limpiar filtros',
                iconCls: 'fa fa-trash'
            },{
                tooltip: '<b>Filtrar</b>',
                iconCls: 'fa fa-filter'
            }]
        }];

        me.items = [{
            xtype: 'tagfield',
            store: me.tagStore,
            queryMode: 'local',
            displayField: 'value',
            valueField: 'id',
            filterPickList: true,
            padding: '5 8 5 8',
            height: 100,
            editable: false
        }];
        me.callParent(arguments);
    }
});