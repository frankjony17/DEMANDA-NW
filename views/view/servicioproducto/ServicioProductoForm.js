
Ext.define('DTG.view.servicioproducto.ServicioProductoForm', {
    extend: 'Ext.window.Window',
    xtype: 'servicio-producto-form',

    iconCls: 'fa fa-phone-square',
    layout: 'fit',
    width: 525,
    resizable: false,
    modal: true,

    initComponent: function ()
    {
        var me = this;

        me.items = [{
            xtype: 'form',
            padding: '10 10 10 10',
            frame: false,
            fieldDefaults: {
                anchor: '100%',
                labelAlign: 'top',
                allowBlank: false
            },
            items: [{
                xtype: 'textfield',
                fieldLabel: 'Servicio o Producto',
                name: 'nombre',
                emptyText: 'Nombre del Servicio o Producto',
                maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                regex: /[aA-zZ]/,
                maxLength: 120
            },{
                xtype: 'textfield',
                fieldLabel: 'Descripción',
                name: 'descripcion',
                emptyText: 'Descripción del Servicio o Producto',
                maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                regex: /[aA-zZ]/,
                maxLength: 120
            },{
                xtype: 'combobox',
                fieldLabel: 'Tipo',
                name: 'tipo',
                emptyText: 'Servicio o Producto',
                store: ['Servicio', 'Producto'],
                queryMode: 'local',
                editable: false
            },{
                xtype: 'hiddenfield',
                name: 'id'
            }]
        }];

        me.buttons = [{
            text: me.btnText,
            iconCls: 'fa fa-check'
        },{
            text: 'Cancelar',
            iconCls: 'fa fa-times',
            handler: function() {
                me.close();
            }
        }];
        me.callParent(arguments);
    }
});