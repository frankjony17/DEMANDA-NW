
Ext.define('DTG.view.demanda.solicitud.EditDemandaForm', {
    extend: 'Ext.window.Window',
    xtype: 'edit-demanda-form',

    title: 'Editar Demanda',
    iconCls: 'fa fa-phone-square',
    layout: 'fit',
    width: 745,
    resizable: false,
    modal: true,

    initComponent: function ()
    {
        var me = this;
        me.empresaStore = Ext.create('DTG.store.EmpresaStore');
        me.organismoStore = Ext.create('DTG.store.OrganismoStore');

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
                xtype: 'fieldset',
                layout: 'hbox',
                defaultType: 'combobox',
                title: 'Filtrar (Sector/Organismo)',
                collapsible: true,
                collapsed: true,
                items: [{
                    emptyText: 'Sector',
                    store: Ext.create('DTG.store.SectorStore'),
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    margin: '0 5 5 0',
                    flex: 1,
                    editable: false,
                    allowBlank: true,
                    listConfig: {itemTpl:['<div data-qtip="{descripcion}">{nombre}</div>']},
                    listeners: {
                        select: function(combo) {
                            me.organismoStore.clearFilter();
                            if(combo.value){
                                me.organismoStore.filter({
                                    property: 'sector_id',
                                    value: combo.value,
                                    exactMatch: true
                                });
                                me.down('[fieldLabel=Empresa]').setValue();
                                me.down('[emptyText=Organismo]').setValue();
                            }
                        }
                    }
                },{
                    emptyText: 'Organismo',
                    store: me.organismoStore,
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    margin: '0 5 0 0',
                    flex: 1,
                    editable: false,
                    allowBlank: true,
                    listConfig: {itemTpl:['<div data-qtip="{direccion}">{nombre} ({acronimo})</div>']},
                    listeners: {
                        select: function(combo) {
                            me.empresaStore.clearFilter();
                            if(combo.value){
                                me.empresaStore.filter({
                                    property: 'organismo_id',
                                    value: combo.value,
                                    exactMatch: true
                                });
                                me.down('[fieldLabel=Empresa]').setValue();
                            }
                        }
                    }
                },{
                    xtype: 'button',
                    name: 'clear-filters',
                    iconCls: 'fa fa-trash',
                    tooltip: 'Quitar filtro.'
                }]
            },{
                xtype: 'fieldset',
                layout: 'hbox',
                items: [{
                    xtype: 'combobox',
                    fieldLabel: 'Empresa',
                    emptyText: 'Empresa solicitante',
                    name: 'empresa',
                    store: me.empresaStore,
                    queryMode: 'local',
                    displayField: 'nombre',
                    valueField: 'id',
                    margin: '0 5 5 0',
                    flex: 1,
                    editable: false,
                    listConfig: {itemTpl:['<div data-qtip="{acronimo}: {direccion}">{nombre}</div>']},
                    afterLabelTextTpl: ['<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'],
                    listeners: {
                        select: function(combo) {
                            me.empresaId = combo.getValue();
                        }
                    }
                },{
                    xtype: 'datefield',
                    fieldLabel: 'Fecha de Solicitud',
                    format: 'Y-m-d',
                    name: 'fecha_solicitud',
                    editable: false,
                    afterLabelTextTpl: ['<span style="color:red;font-weight:bold" data-qtip="Required">*</span>'],
                    listeners: {
                        select: function(field, value) {
                            me.fechaSolicitud = value;

                        }
                    }
                }]
            }]
        }];
        me.buttons = [{
            text: 'Editar',
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