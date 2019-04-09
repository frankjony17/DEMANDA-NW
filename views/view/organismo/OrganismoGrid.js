
Ext.define('DTG.view.organismo.OrganismoGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'organismo-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',
    features: [{
        groupHeaderTpl: [
            'Sector: {name:this.upper}', {
                upper: function (name) {
                    return name.toUpperCase();
                }
            }
        ],
        ftype: 'groupingsummary',
        collapsible: true
    }],

    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.OrganismoStore');
        this.modelName = 'Organismo';

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
            text: 'Acrónimo',
            dataIndex: 'acronimo',
            flex: 1
        },{
            text: 'Nombre',
            dataIndex: 'nombre',
            flex: 3
        },{
            text: 'Dirección',
            dataIndex: 'direccion',
            flex: 4
        },{
            text: 'SectorId',
            dataIndex: 'sector_id',
            width: 35,
            hidden: true
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar organismo',
            iconCls: 'fa fa-plus'
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar organismo',
            iconCls: 'fa fa-trash'
        }];
        this.callParent();
    }
});