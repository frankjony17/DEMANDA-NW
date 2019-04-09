
Ext.define('DTG.view.Viewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'view-viewport-desktop',

    layout: { type: 'border', padding: 4 },
    style: { backgroundColor: '#60A3DD' },

    initComponent: function() {
        var me = this;
        me.items = [{
            region: 'north',
            xtype: 'tabpanel',
            activeTab: 1,
            id: 'north-tabpanel',
            border: false,
            defaults: {
                bodyPadding: 5,
                border: false
            },
            items: [{
                title: '<b>Nomencladores</b>', id: 'nomencladores-tab',
                icon: 'resources/images/nomencladores.png',
                items: [{
                    xtype: 'panel', id: 'nomencladores-tab-panel',
                    border: false,
                    collapsible: true,
                    titleCollapse: true,
                    tools: [{
                        type: 'close',
                        handler: function(){DTG.View.remove();DTG.View.setTitlePanel('nomencladores-tab-panel','');DTG.View.expandPanel('nomencladores-tab-panel',this);}
                    }],
                    items: [{
                        xtype: 'toolbar',
                        items: [{
                            xtype: 'buttongroup',
                            title: 'Entidades',
                            padding: 5,
                            items: [{
                                text: 'Sector',
                                id: 'viewport-sector-items',
                                iconCls: 'fa fa-flag',
                                iconAlign: 'top'
                            },{
                                text: 'Organismo',
                                id: 'viewport-organismo-items',
                                iconCls: 'fa fa-institution',
                                iconAlign: 'top'
                            },{
                                text: 'Empresa',
                                id: 'viewport-empresa-items',
                                iconCls: 'fa fa-home',
                                iconAlign: 'top'
                            }]
                        },{
                            xtype: 'buttongroup',
                            title: 'Usuarios y Trabajadores',
                            padding: 5,
                            items: [{
                                text: 'Cargo',
                                id: 'viewport-cargo-items',
                                iconCls: 'fa fa-graduation-cap',
                                iconAlign: 'top'
                            },{
                                text: 'Tipo',
                                id: 'viewport-tipo-items',
                                iconCls: 'fa fa-tags',
                                iconAlign: 'top'
                            },{
                                text: 'Persona',
                                id: 'viewport-persona-items',
                                iconCls: 'fa fa-male',
                                iconAlign: 'top'
                            }]
                        },{
                            xtype: 'buttongroup',
                            title: 'Otros',
                            padding: 5,
                            items: [{
                                text: 'Periodo de guerra',
                                id: 'viewport-periodo-items',
                                iconCls: 'fa fa-rocket',
                                iconAlign: 'top'
                            }]
                        },'->',{
                            xtype: 'buttongroup',
                            title: 'Sistema',
                            padding: 5,
                            items: [{
                                text: 'Ayuda',
                                tooltip: 'Ayuda general.',
                                iconCls: 'fa fa-question',
                                iconAlign: 'top'
                            }, {
                                text: 'Salir',
                                tooltip: 'Salir del sistema. (Logout)',
                                iconCls: 'fa fa-power-off',
                                iconAlign: 'top'
                            }]
                        }]
                    }]
                }]
            },{
                title: '<b>Demanda</b>', id: 'demanda-tab',
                icon: 'resources/images/demanda.png',
                items: [{
                    xtype: 'panel',
                    id: 'demanda-tab-panel',
                    border: false,
                    collapsible: true,
                    titleCollapse: true,
                    tools: [{
                        type: 'close',
                        handler: function(){DTG.View.remove();DTG.View.setTitlePanel('demanda-tab-panel', '');DTG.View.expandPanel('demanda-tab-panel', this);}
                    }],
                    items: [{
                        xtype: 'toolbar',
                        items: [{
                            xtype: 'buttongroup',
                            title: 'Servicios y Demandas',
                            padding: 5,
                            items: [{
                                text: 'Servicios y productos',
                                id: 'viewport-servicios-items',
                                tooltip: 'Servicios y productos.',
                                iconCls: 'fa fa-tty',
                                iconAlign: 'top'
                            },{
                                text: 'Demanda por empresa',
                                id: 'viewport-demanda-items',
                                iconCls: 'fa fa-phone-square',
                                iconAlign: 'top'
                            },{
                                xtype: 'tbspacer', width: 5
                            }]
                        },'->',{
                            xtype: 'buttongroup',
                            title: 'Sistema',
                            padding: 5,
                            items: [{
                                text: 'Ayuda',
                                tooltip: 'Ayuda general.',
                                iconCls: 'fa fa-question',
                                iconAlign: 'top'
                            }, {
                                text: 'Salir',
                                tooltip: 'Salir del sistema. (Logout)',
                                iconCls: 'fa fa-power-off',
                                iconAlign: 'top'
                            }]
                        }]
                    }]
                }]
            },{
                title: '<b>Reportes</b>', id: 'reportes-tab',
                icon: 'resources/images/pdf.png',
                items: [{
                    xtype: 'panel', id: 'reportes-tab-panel',
                    border: false,
                    collapsible: true,
                    titleCollapse: true,
                    tools: [{
                        type: 'close',
                        handler: function(){DTG.View.remove();DTG.View.setTitlePanel('reportes-tab-panel', '');DTG.View.expandPanel('reportes-tab-panel', this);}
                    }],
                    items: [{
                        xtype: 'toolbar',
                        items: [{
                            xtype: 'buttongroup',
                            title: 'PDF',
                            padding: 5,
                            items: [{
                                text: 'Anexo No. 3',
                                tooltip: 'Modelo Resumen',
                                iconCls: 'fa fa-building',
                                iconAlign: 'top',
                                id: 'viewport-reporte-anexo-no-3'
                            },{
                                text: 'Servicios',
                                iconCls: 'fa fa-fax',
                                tooltip: 'Servicios que continúan.',
                                iconAlign: 'top'
                            },{
                                text: 'Orden de Servicio',
                                iconCls: 'fa fa-legal',
                                iconAlign: 'top'
                            }]
                        },'->',{
                            xtype: 'buttongroup',
                            title: 'Sistema',
                            padding: 5,
                            items: [{
                                text: 'Ayuda',
                                tooltip: 'Ayuda general.',
                                iconCls: 'fa fa-question',
                                iconAlign: 'top'
                            }, {
                                text: 'Salir',
                                tooltip: 'Salir del sistema. (Logout)',
                                iconCls: 'fa fa-power-off',
                                iconAlign: 'top'
                            }]
                        }]
                    }]
                }]
            },{
                title: '<b>Útiles</b>', id: 'others-tab',
                icon: 'resources/images/util.png',
                items: [{
                    xtype: 'panel',
                    id: 'others-tab-panel',
                    border: false,
                    collapsible: true,
                    titleCollapse: true,
                    tools: [{
                        type: 'close',
                        handler: function(){DTG.View.remove();DTG.View.setTitlePanel('others-tab-panel', '');DTG.View.expandPanel('others-tab-panel', this);}
                    }],
                    items: [{
                        xtype: 'toolbar',
                        items: [{
                            xtype: 'buttongroup',
                            title: 'Salvar Base de Datos',
                            padding: 5,
                            items: [{
                                text: 'Guardar',
                                iconCls: 'fa fa-database',
                                iconAlign: 'top'
                            }, {
                                text: 'Guardar como',
                                iconCls: 'fa fa-archive',
                                iconAlign: 'top'
                            }, {
                                text: 'Abrir',
                                iconCls: 'fa fa-folder-open',
                                iconAlign: 'top',
                                disabled: true
                            }]
                        }, '->', {
                            xtype: 'buttongroup',
                            title: 'Sistema',
                            padding: 5,
                            items: [{
                                text: 'Ayuda',
                                tooltip: 'Ayuda general.',
                                iconCls: 'fa fa-question',
                                iconAlign: 'top'
                            }, {
                                text: 'Salir',
                                tooltip: 'Salir del sistema. (Logout)',
                                iconCls: 'fa fa-power-off',
                                iconAlign: 'top'
                            }]
                        }]
                    }]
                }]
            }]
        },{
            region: 'center',
            xtype: 'panel',
            border: false,
            bodyStyle: 'background-image:url(resources/images/square.gif);',
            id: 'center-panel-id'
        },{
            region: 'south',
            id: 'south-panel-id',
            items: Ext.create('DTG.view.StatusBarPanel')
        }];
        me.callParent(arguments);
    }
});