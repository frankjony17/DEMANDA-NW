
Ext.define('DTG.view.persona.PersonaForm', {
    extend: 'Ext.window.Window',
    xtype: 'persona-form',

    iconCls: 'fa fa-male',
    layout: 'fit',
    width: 770,
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
                    fieldLabel: 'Nombre',
                    name: 'nombre',
                    emptyText: 'Nombre de la Persona',
                    maskRe: /[A-Za-z-áéíóú\s]/,
                    regex: /^[A-Z][a-zá-ú]/,
                    regexText: 'El nombre deben de estar en el formato: <b>Nnnn Nnnn</b><br><b>Ej: Frank</b><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<b>Frank Antonio</b>',
                    maxLength: 30,
                    margin: '0 5 5 0',
                    flex: 1,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ],
                    listeners: {change:function(field){var n=field.getValue().split(' ');n.length>1?field.setValue(n[0]+' '+n[1]):null;}}
                },{
                    fieldLabel: 'Apellidos',
                    name: 'apellidos',
                    emptyText: 'Apellidos de la Persona',
                    maskRe: /[A-Za-z-áéíóú\s]/,
                    regex: /^[A-Z][a-zá-ú]+\s[A-Z][a-zá-ú]+$/,
                    regexText: 'Los apellidos deben de estar en el formato: <b>Nnnn Nnnn</b><br>Ej: <b>Ricardo Ramirez</b>',
                    maxLength: 30,
                    margin: '0 5 0 0',
                    flex: 1,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                },{
                    fieldLabel: 'CI',
                    name: 'ci',
                    emptyText: 'Carne de Identidad',
                    maskRe: /[0-9]/,
                    margin: '0 0 0 0',
                    allowBlank: true,
                    flex: 1,
                    validator: function(val){var date=new Date(),date=date.getFullYear();if(val.length>11||val.length<11){if(val.length===0){return true;}else{return "El tamaño máximo para el <b>CI</b> es de <b>11</b> caracteres.";}}else{if(val.length===11){var year=date-val.slice(0,2),month=parseInt(val.slice(2,4)),day=parseInt(val.slice(4,6)),edad=String(year).slice(2,4);if(edad<18||edad>85){return "La edad de la persona debe estar ente los <b>18</b> y <b>85</b> años.<br>El año del <b>CI</b> debe estar entre 19<b>30</b> y 19<b>97</b><br><br>";}if(month<1||month>12){return "El mes de nacimiento es incorreco, <b>NO EXISTE!!!</b>.";}if (day < 1 || day > 31) {return "El día de nacimiento es incorreco, <b>NO EXISTE!!!</b>.";}return true;}return true;}}
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                defaultType: 'textfield',
                items: [{
                    xtype: 'container',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    margin: '0 5 0 0',
                    items: [{
                        fieldLabel: 'Móvil',
                        name: 'movil',
                        emptyText: 'xx-xx-xxxx',
                        maskRe: /[\d\-]/,
                        regex: /^\d{2}-\d{2}-\d{4}$/,
                        regexText: 'El número debe de estar en el formato: <b>xx-xx-xxxx</b>',
                        allowBlank: true,
                        margin: '0 0 5 0',
                        flex: 2
                    }]
                },{
                    xtype: 'container',
                    layout: 'hbox',
                    defaultType: 'textfield',
                    flex: 3,
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
                        margin: '0 5 0 0',
                        flex: 1,
                        allowBlank: true
                    },{
                        fieldLabel: '&nbsp;',
                        labelSeparator: '',
                        name: 'tele3',
                        emptyText: 'xxx-xx-xxxx',
                        maskRe: /[\d\-]/,
                        regex: /^\d{3}-\d{2}-\d{4}$/,
                        regexText: 'Los números deben de estar en el formato: <b>xxx-xx-xxxx</b><br>Ej: <b>046-32-0000</b>',
                        margin: '0 0 0 0',
                        flex: 1,
                        allowBlank: true
                    }]
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                defaultType: 'combobox',
                items: [{
                    fieldLabel: 'Cargo',
                    emptyText: 'Cargo que Ocupa.',
                    name: 'cargo',
                    store: Ext.create('DTG.store.CargoStore'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    editable: false,
                    listConfig: {itemTpl:['<div data-qtip="{descripcion}">{nombre}</div>']},
                    margin: '0 5 5 0',
                    allowBlank: true,
                    flex: 1,
                    listeners: {select:function(combo){me.cargoId=combo.getValue();}}
                },{
                    fieldLabel: 'Tipo',
                    emptyText: 'Tipo de Persona',
                    name: 'tipo_persona',
                    store: Ext.create('DTG.store.TipoPersonaStore'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    editable: false,
                    listConfig: {itemTpl: ['<div data-qtip="{descripcion}">{nombre}</div>']},
                    margin: '0 5 0 0',
                    flex: 1,
                    listeners: {select: function(combo){me.personaTipoId=combo.getValue();}},
                    afterLabelTextTpl: ['<span style="color:red;font-weight:bold" data-qtip="Required">*</span>']
                },{
                    fieldLabel: 'Empresa',
                    emptyText: 'Empresa a la que pertenece.',
                    name: 'empresa',
                    store: Ext.create('DTG.store.EmpresaStore'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    editable: false,
                    listConfig: {itemTpl:['<div data-qtip="{direccion}">{nombre}</div>']},
                    margin: '0 0 0 0',
                    flex: 1,
                    listeners: {select:function(combo){me.empresaId=combo.getValue();}},
                    afterLabelTextTpl: ['<span style="color:red;font-weight:bold" data-qtip="Required">*</span>']
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