
Ext.define('DTG.view.servicioproducto.ServicioProductoGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'servicio-producto-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',
    features: [{
        groupHeaderTpl: ['Tipo: {name:this.upper}', {upper:function(name){return '<b>'+ name.toUpperCase() +'</b>';}}],
        ftype: 'groupingsummary',
        collapsible: true
    }],
    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.ServicioProductoStore');
        this.modelName = 'ServicioProducto';

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
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 2
        },{
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 3
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar Servicio o Producto',
            iconCls: 'fa fa-plus',
            disabled: false
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar Servicio o Producto',
            iconCls: 'fa fa-trash',
            disabled: false
        }];
        this.callParent();
    }
});