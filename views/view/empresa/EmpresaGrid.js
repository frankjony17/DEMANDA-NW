
Ext.define('DTG.view.empresa.EmpresaGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'empresa-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',
    features: [{
        groupHeaderTpl: [
            'Organismo: {name:this.upper}', {
                upper: function (name) {
                    return name.toUpperCase();
                }
            }
        ],
        ftype: 'groupingsummary',
        collapsible: true
    }],
    plugins: [{
        ptype: 'rowexpander',
        rowBodyTpl: [
            '<table><tr><th><div class="tablestyle">' +
            '<table>' +
            '<thead>' +
                '<tr><th>Empresa (email)</th></tr>' +
            '</thead>' +
            '<tbody>' +
            '<tr><td>{correo}</td></tr>' +
            '</tbody>' +
            '</table>' +
            '</div></th></tr></table>'
        ]
    }],
    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.EmpresaStore');

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
            flex: 4
        },{
            text: 'Dirección',
            dataIndex: 'direccion',
            flex: 3
        },{
            text: 'Teléfonos',
            dataIndex: 'telefonos',
            flex: 2
        },{
            text: 'OrganismoId',
            dataIndex: 'organismo_id',
            width: 35,
            hidden: true
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar empresa',
            iconCls: 'fa fa-plus'
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar empresa',
            iconCls: 'fa fa-trash'
        }];
        this.callParent();
    }
});