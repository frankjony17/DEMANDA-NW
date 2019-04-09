
Ext.define('DTG.view.admin.AdminViewport', {
    extend: 'Ext.container.Viewport',
    xtype: 'admin-viewport-desktop',

    layout: { type: 'border', padding: 4 },
    style: { backgroundColor: '#60A3DD' },

    initComponent: function()
    {
        var me = this;

        me.items = [{
            region: 'north',
            xtype: 'panel',
            id: 'north-panel',
            border: false,
            defaults: {
                bodyPadding: 5,
                border: false
            },
            items: [{
                title: '<b>Administrador DTG</b>',
                iconCls: 'fa fa-users',
                xtype: 'panel',
                id: 'admin-tab-panel',
                border: false,
                collapsible: true,
                titleCollapse: true,
                tools: [{
                    type: 'close',
                    handler: function () {
                        DTG.View.remove();
                        DTG.View.setTitlePanel('admin-tab-panel', '<b>Administrador DTG</b>');
                        DTG.View.expandPanel('admin-tab-panel', this);
                    }
                }],
                items: [{
                    xtype: 'toolbar',
                    items: [{
                        xtype: 'buttongroup',
                        title: 'Seguridad (Usuarios)',
                        padding: 5,
                        items: [{
                            text: 'Usuarios',
                            iconCls: 'fa fa-users',
                            iconAlign: 'top'
                        }, {
                            text: 'Contraseña',
                            iconCls: 'fa fa-key',
                            iconAlign: 'top'

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
        },{
            region: 'center',
            xtype: 'panel',
            border: false,
            bodyStyle: 'background-image:url(app/resources/images/square.gif);',
            id: 'center-panel-id'
        },{
            region: 'south',
            id: 'south-panel-id',
            items: Ext.create('DTG.view.StatusBarPanel')
        }];
        me.callParent(arguments);
    }
});