
Ext.define('DTG.view.sector.SectorGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'sector-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',

    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.SectorStore');
        this.modelName = 'Sector';

        this.columns = [{
            xtype: 'rownumberer',
            text: 'No',
            width: 45,
            align: 'center'
        }, {
            text: 'Id',
            dataIndex: 'id',
            width: 35,
            hidden: true
        }, {
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 2
        }, {
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 3
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar sector',
            iconCls: 'fa fa-plus',
            disabled: true
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar sector',
            iconCls: 'fa fa-trash',
            disabled: true
        }];
        this.callParent();
    }
});