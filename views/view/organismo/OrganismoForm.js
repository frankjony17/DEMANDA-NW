
Ext.define('DTG.view.organismo.OrganismoForm', {
    extend: 'Ext.window.Window',
    xtype: 'organismo-form',

    iconCls: 'fa fa-institution',
    layout: 'fit',
    width: 525,
    resizable: false,
    modal: true,

    initComponent: function () {
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
                xtype: 'container',
                border: false,
                layout: 'hbox',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Acrónimo',
                    name: 'acronimo',
                    emptyText: 'Acrónimo del Organismo',
                    maskRe: /[A-Z]/,
                    regex: /[A-Z]/,
                    maxLength: 20,
                    margin: '0 5 5 0',
                    allowBlank: true,
                    flex: 2
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Organismo',
                    name: 'nombre',
                    emptyText: 'Nombre del Organismo',
                    maskRe: /[aA-zZ\ \áéíóúñÁÉÍÓÚÑ]/,
                    regex: /[aA-zZ]/,
                    maxLength: 120,
                    margin: '0 0 0 0',
                    flex: 4,
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }]
            }, {
                xtype: 'container',
                border: false,
                layout: 'anchor',
                items: [{
                    xtype: 'textfield',
                    fieldLabel: 'Dirección',
                    name: 'direccion',
                    emptyText: 'Dirección del Organismo',
                    maxLength: 85,
                    allowBlank: true
                }, {
                    xtype: 'combobox',
                    fieldLabel: 'Sector',
                    emptyText: 'Sector al que pertenece',
                    name: 'sector_id',
                    store: Ext.create('DTG.store.SectorStore'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    editable: false,
                    listConfig: {
                        itemTpl: [
                            '<div data-qtip="{descripcion}">{nombre} > {descripcion}</div>'
                        ]
                    },
                    listeners: {
                        select: function (combo) {
                            me.sectorId = combo.getValue();
                        }
                    },
                    afterLabelTextTpl: [
                        '<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'
                    ]
                }, {
                    xtype: 'hiddenfield',
                    name: 'id'
                }]
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