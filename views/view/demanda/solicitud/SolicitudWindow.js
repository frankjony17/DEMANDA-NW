
Ext.define('DTG.view.demanda.solicitud.SolicitudWindow', {
    extend: 'Ext.window.Window',
    xtype: 'solicitud-demanda-window',

    layout: 'fit',
    closable: false,
    autoShow: true,
    maximized: true,
    draggable: false,
    resizable: false,
    iconCls: 'fa fa-shopping-cart',

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            padding: '0 5 0 5',
            items: [{
                xtype: 'fieldset',
                title: 'Servicios y Productos',
                name: 'fieldset-servicio-producto',
                layout: 'fit',
                padding: '0 5 5 5',
                items: [
                    Ext.create('DTG.view.demanda.solicitud.ServicioProductoGrid', { demandaId: me.demandaId}),
                    { xtype: 'tbspacer', height: 5 },
                    Ext.create('DTG.view.demanda.solicitud.IdentificacionServicioGrid')
                ]
            },{
                xtype: 'container',
                layout: 'hbox',
                defaults: { flex: 1 },
                items: [{
                    xtype: 'fieldset',
                    layout: 'hbox',
                    title: 'Solicitante:',
                    margin: '0 5 0 0',
                    padding: '0 5 5 5',
                    items: [{
                        xtype: 'combobox',
                        emptyText: 'Usuario',
                        name: 'solicitante',
                        store: me.solicitanteStore,
                        queryMode: 'local',
                        displayField: 'nombre',
                        valueField: 'id',
                        value: me.solicitante,
                        editable: false,
                        flex: 1,
                        tpl: Ext.create('Ext.XTemplate',
                            '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{nombre} {apellidos}</li>',
                            '</tpl></ul>'
                        ),
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{nombre} {apellidos}',
                            '</tpl>'
                        )
                    },{
                        xtype: 'button',
                        name: 'filtro-solicitante',
                        iconCls: 'fa fa-search',
                        tooltip: 'Filtrar por cargo'
                    }]
                },{
                    xtype: 'fieldset',
                    layout: 'hbox',
                    title: 'Aprobado por:',
                    padding: '0 5 5 5',
                    items: [{
                        xtype: 'combobox',
                        emptyText: 'Trabajador',
                        name: 'aprobado-por',
                        store: me.personaApruStore,
                        queryMode: 'local',
                        displayField: 'nombre',
                        valueField: 'id',
                        value: me.aprobado_por,
                        editable: false,
                        flex: 1,
                        tpl: Ext.create('Ext.XTemplate',
                            '<ul class="x-list-plain"><tpl for=".">',
                            '<li role="option" class="x-boundlist-item">{nombre} {apellidos}</li>',
                            '</tpl></ul>'
                        ),
                        displayTpl: Ext.create('Ext.XTemplate',
                            '<tpl for=".">',
                            '{nombre} {apellidos}',
                            '</tpl>'
                        )
                    },{
                        xtype: 'button',
                        name: 'filtro-aprobado-por',
                        iconCls: 'fa fa-search',
                        tooltip: 'Filtrar por cargo'
                    }]
                }]
            }]
        }];
        me.tools = [{
            xtype: 'button',
            //text: 'Cancelar',
            iconCls: 'fa fa-times',
            //tooltip: 'Cerrar ventana',
            padding: '2 2 2 2',
            handler: function() {
                me.close();
            }
        }];
        me.callParent(arguments);
    }
});