
Ext.define('DTG.view.login.Viewport', {
    extend: 'Ext.container.Viewport',
    id: 'viewport-login-desktop',

    layout: { type: 'border', padding: 4 },

    items: [{
        region: 'center',
        xtype: 'panel',
        border: true,
        bodyStyle: 'background-image:url(app/resources/images/square.gif);',
        items: Ext.create('DTG.view.login.LoginForm'),
        id: 'login-viewport-center-panel'
    }]
});