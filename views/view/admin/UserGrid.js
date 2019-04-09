/**
 * Grid user.
 */
Ext.define('DTG.view.admin.UserGrid', {
    extend: 'Ext.grid.Panel',
    xtype: 'user-grid',

    width: '100%',
    border: false,
    selType: 'checkboxmodel',
    autoScroll: true,
    scrollable: 'vertical',

    initComponent: function ()
    {
        this.store = Ext.create('DTG.store.UserStore');

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
            text: 'Alias',
            dataIndex: 'username',
            flex: 2
        },{
            text: 'Nombre y apellidos',
            dataIndex: 'full_name',
            flex: 3
        },{
            text: 'KEY',
            dataIndex: 'key',
            flex: 4
        },{
            text: 'Ultima entrada',
            dataIndex: 'date_last_login',
            flex: 2,
            align: 'center'
        }];
        this.tbar = [{
            text: 'Adicionar',
            tooltip: 'Adicionar usuario',
            iconCls: 'fa fa-user-plus'
        },{
            text: 'Eliminar',
            tooltip: 'Eliminar usuario',
            iconCls: 'fa fa-user-times'
        }];
        this.callParent();
    }
});