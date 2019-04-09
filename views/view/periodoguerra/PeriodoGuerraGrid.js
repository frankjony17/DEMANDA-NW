
Ext.define('DTG.view.periodoguerra.PeriodoGuerraGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'periodo-guerra-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',

    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.PeriodoGuerraStore');
        this.modelName = 'PeriodoGuerra';

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
            text: 'Etapa',
            dataIndex: 'etapa',
            flex: 1
        }, {
            text: 'Descripción',
            dataIndex: 'descripcion',
            flex: 3
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar periodo de guerra',
            iconCls: 'fa fa-plus',
            disabled: true
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar periodo de guerra',
            iconCls: 'fa fa-trash',
            disabled: true
        }];
        this.callParent();
    }
});