
Ext.define('DTG.view.persona.PersonaGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'persona-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',
    features: [{
        groupHeaderTpl: [
            'Empresa: {name:this.upper}', {
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
        this.store = Ext.create('DTG.store.PersonaStore');

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
            xtype:'templatecolumn',
            tpl:'{nombre} {apellidos} <b>({cargo})</b>',
            dataIndex: 'nombre',
            flex: 2
        },{
            text: 'Apellidos',
            dataIndex: 'apellidos',
            flex: 1,
            hidden: true
        },{
            text: 'CI',
            dataIndex: 'ci',
            flex: 1
        },{
            text: 'Teléfonos',
            columns: [{
                text: 'Móvil',
                dataIndex: 'movil',
                width: 100
            },{
                text: 'Fijos',
                dataIndex: 'telefonos',
                width: 275
            }]
        },{
            text: 'Tipo',
            dataIndex: 'tipo_persona',
            width: 60,
            align: 'center',
            renderer : function(val) {
                if (val.trim() === 'Usuario') {
                    return '<span style="color: #3e5188"><b>U</b></span>';
                } else if (val.trim() === 'Trabajador') {
                    return '<span style="color: #3e5188"><b>T</b></span>';
                } else {
                    return '<span style="color: #3e5188"><b>O</b></span>';
                }
            }
        },{
            text: 'Cargo',
            dataIndex: 'cargo',
            hidden: true
        },{
            text: 'CID',
            dataIndex: 'cargo_id',
            hidden: true
        },{
            text: 'SID',
            dataIndex: 'empresa_id',
            hidden: true
        },{
            text: 'PTID',
            dataIndex: 'tipo_persona_id',
            hidden: true
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar persona',
            iconCls: 'fa fa-plus'
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar persona',
            iconCls: 'fa fa-trash'
        }];
        this.callParent();
    }
});