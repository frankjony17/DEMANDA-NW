
Ext.define('DTG.view.empresa.EmpresaForm', {
    extend: 'Ext.window.Window',
    xtype: 'empresa-form',

    iconCls: 'fa fa-home',
    layout: 'fit',
    width: 700,
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
                allowBlank: false,
                labelAlign: 'top'
            },
            items: [{
                xtype: 'fieldset',
                layout: 'hbox',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Acrónimo',
                    name: 'acronimo',
                    emptyText: 'Acrónimo de la Empresa',
                    maskRe: /[A-Z]/,
                    regex: /[A-Z]/,
                    maxLength: 20,
                    margin: '0 5 5 0',
                    flex: 2,
                    allowBlank: true
                },{
                    fieldLabel: 'Empresa',
                    name: 'nombre',
                    emptyText: 'Nombre de la Empresa',
                    //maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    //regex: /[aA-zZ]/,
                    maxLength: 120,
                    margin: '0 0 0 0',
                    flex: 5,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }]
            },{
                xtype: 'fieldset',
                layout: 'anchor',
                defaultType: 'textfield',
                items: [{
                    fieldLabel: 'Dirección',
                    name: 'direccion',
                    emptyText: 'Dirección de la Empresa',
                    maxLength: 120,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                },{
                    fieldLabel: 'Correo',
                    emptyText: 'Correo electrónico (email)',
                    vtype: 'email',
                    name: 'correo',
                    maxLength: 60,
                    allowBlank: true
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    margin: '0 5 0 0',
                    flex: 2,
                    items: [{
                        fieldLabel: 'Teléfonos',
                        name: 'tele1',
                        emptyText: 'xxx-xx-xxxx',
                        maskRe: /[\d\-]/,
                        regex: /^\d{3}-\d{2}-\d{4}$/,
                        regexText: 'Los números deben de estar en el formato: <b>xxx-xx-xxxx</b><br>Ej: <b>046-32-0000</b>',
                        margin: '0 5 5 0',
                        flex: 1,
                        allowBlank: true
                    },{
                        fieldLabel: '&nbsp;',
                        labelSeparator: '',
                        name: 'tele2',
                        emptyText: 'xxx-xx-xxxx',
                        maskRe: /[\d\-]/,
                        regex: /^\d{3}-\d{2}-\d{4}$/,
                        regexText: 'Los números deben de estar en el formato: <b>xxx-xx-xxxx</b><br>Ej: <b>046-32-0000</b>',
                        flex: 1,
                        allowBlank: true
                    }]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    flex: 3,
                    items: [{
                        xtype: 'combobox',
                        fieldLabel: 'Organismo',
                        emptyText: 'Organismo al que pertenece.',
                        name: 'organismo_id',
                        store: Ext.create('DTG.store.OrganismoStore'),
                        queryMode: 'local',
                        displayField: 'nombre',
                        valueField: 'id',
                        editable: false,
                        listConfig: {itemTpl:['<div data-qtip="{acronimo}: {direccion}">{nombre} ({acronimo})</div>']},
                        listeners: {select:function(combo){me.organismoId=combo.getValue();}},
                        afterLabelTextTpl: ['<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'],
                        flex: 1,
                        margin: '0 0 5 0'
                    }]
                }]
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