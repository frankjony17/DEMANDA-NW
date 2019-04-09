
Ext.define('DTG.view.reporte.ReporteWindow', {
    extend: 'Ext.window.Window',
    xtype: 'reporte-window',

    header: false,
    autoShow: true,
    maximized: true,
    scrollable: true,
    resizable: false,
    bodyStyle: 'background-image:url(resources/images/square.gif);',

    initComponent: function () {
        var me = this;
        this.tbar = Ext.create('Ext.toolbar.Toolbar', {
            items: [{
                text: 'Márgenes',
                xtype: 'splitbutton',
                arrowAlign: 'bottom',
                icon: 'resources/images/pdf/margen.png',
                iconAlign: 'top',
                menu: new Ext.menu.Menu({
                    width: 455,
                    items: [{
                        text: '<b>Normal: </b>[<b>Sup</b>: 2.5 cm, <b>Inf</b>: 2.5 cm, <b>Izdo</b>: 3 cm, <b>Dcho</b>: 3 cm]',
                        icon: 'resources/images/pdf/m-normal.png',
                        id: 'report-m-normal'
                    },{
                        text: '<b>Estrecho: </b>[<b>Sup</b>: 1.27 cm, <b>Inf</b>: 1.27 cm, <b>Izdo</b>: 1.27 cm, <b>Dcho</b>: 1.27 cm]',
                        icon: 'resources/images/pdf/m-estrecho.png',
                        id: 'report-m-estrecho'
                    },{
                        text: '<b>Moderado: </b>[<b>Sup</b>: 2.54 cm, <b>Inf</b>: 2.54 cm, <b>Izdo</b>: 1.91 cm, <b>Dcho</b>: 1.91 cm]',
                        icon: 'resources/images/pdf/m-moderado.png',
                        id: 'report-m-moderado'
                    }]
                })
            },{
                text: 'Orientación',
                xtype: 'splitbutton',
                arrowAlign: 'bottom',
                icon: 'resources/images/pdf/orientacion.png',
                iconAlign: 'top',
                menu: new Ext.menu.Menu({
                    items: [{
                        text: 'Vertical',
                        icon: 'resources/images/pdf/align-vertical.png',
                        id: 'report-align-vertical'
                    },{
                        text: 'Horizontal',
                        icon: 'resources/images/pdf/align-horizontal.png',
                        id: 'report-align-horizontal'
                    }]
                })
            },{
                text: 'Tamaño',
                xtype: 'splitbutton',
                arrowAlign: 'bottom',
                icon: 'resources/images/pdf/documento.png',
                iconAlign: 'top',
                menu: new Ext.menu.Menu({
                    items: [{
                        text: 'Carta',
                        icon: 'resources/images/pdf/carta.png',
                        id: 'report-carta'
                    },{
                        text: 'A4',
                        icon: 'resources/images/pdf/a4.png',
                        id: 'report-a4'
                    }]
                })
            },' ','-',{
                text: 'Salvar',
                arrowAlign: 'bottom',
                icon: 'resources/images/pdf/document-save.png',
                iconAlign: 'top',
                id: 'pdf-save-bottom'
            },{
                xtype: 'tbtext',
                id: 'tbtext-page-config'
            },'->',{
                iconCls: 'fa fa-times',
                handler: function() {
                    me.close();
                }
            }]
        });
        this.callParent();
    }
});
