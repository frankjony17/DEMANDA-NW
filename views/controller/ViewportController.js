
Ext.define('DTG.controller.ViewportController', {
    extend: 'Ext.app.Controller',

    control: {
        'view-viewport-desktop': { /*resize: "onResize",*/ afterrender: "onAfterRender" },
        'view-viewport-desktop [iconCls=fa fa-power-off]': { click: "onLogout" },
        '#nomencladores-tab': { activate: "onActivate", deactivate: "onDeactivate" },
        '#demanda-tab': { activate: "onActivate", deactivate: "onDeactivate" },
        '#reportes-tab': { activate: "onActivate", deactivate: "onDeactivate" },
        '#util-tab': { activate: "onActivate", deactivate: "onDeactivate" },
        '#viewport-sector-items': { click: "onClickSectorItem" },
        '#viewport-organismo-items': { click: "onClickOrganismoItem" },
        '#viewport-empresa-items': { click: "onClickEmpresaItem" },
        '#viewport-cargo-items': { click: "onClickCargoItem" },
        '#viewport-tipo-items': { click: "onClickTipoItem" },
        '#viewport-persona-items': { click: "onClickPersonaItem" },
        '#viewport-periodo-items': { click: "onClickPeriodoGuerraItem" },
        '#viewport-servicios-items': {
            click: "onClickServicioProductoItem"
        },
        '#viewport-demanda-items': {
            click: "onClickDemandaItem"
        },
        /* REPORT */
        '#viewport-reporte-anexo-no-3': {
            click: "onClickAnexoNo3"
        },
    },
    //onResize: function () {
        //var win=Ext.getCmp('reporte-panel-window');
        //if (win) {
        //    win.setWidth(DTG.Window.width - 30);
        //    win.setHeight(DTG.Window.height - 30);
        //}
    //},
    onAfterRender: function ()
    {
        DTG.Sequelize.sync();//{force:true}
    },
    onActivate: function (tab)
    {
        DTG.View.expandPanel(tab.id + '-panel');
    },
    onDeactivate: function (tab)
    {
        DTG.View.setTitlePanel(tab.id +'-panel', '');
        // Eliminar componente.
        DTG.View.remove();
        // Update StatusBar.
        DTG.View.updateStatusBar('');
    },
    onLogout: function ()
    {
        DTG.Window.reload();
    },
    // On Sector Click.
    onClickSectorItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.sector.SectorGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Sector</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Sector');
    },
    // On Organismo Click.
    onClickOrganismoItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.organismo.OrganismoGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Organismo</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Organismo');
    },
    // On Empresa Click.
    onClickEmpresaItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.empresa.EmpresaGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Empresa</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Empresa');
    },
    // On Cargo Click.
    onClickCargoItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.cargo.CargoGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Cargo</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Cargo');
    },
    // On Tipo de Persona Click.
    onClickTipoItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.tipopersona.TipoPersonaGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Tipo de Persona</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Tipo de Persona');
    },
    // On Persona Click.
    onClickPersonaItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.persona.PersonaGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Persona</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Persona');
    },
    // On Etapa de Guerra Click.
    onClickPeriodoGuerraItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.periodoguerra.PeriodoGuerraGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('nomencladores-tab-panel', '<b>Gestionar > Nomencladores > Periodo de Guerra</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('nomencladores-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Periodo de Guerra');
    },
    // On ServicioProducto Click.
    onClickServicioProductoItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.servicioproducto.ServicioProductoGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('demanda-tab-panel', '<b>Gestionar > Nomencladores > Servicios y Productos</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('demanda-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Servicios y Productos');
    },
    // On Demanda Click.
    onClickDemandaItem: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.demanda.DemandaGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('demanda-tab-panel', '<b>Gestionar > Demanda</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('demanda-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Demanda');
    },
    // on Anexo No. 3 Click
    onClickAnexoNo3: function ()
    {   // Add component to center panel.
        Ext.create('DTG.view.reporte.ReporteWindow', { name: 'ANEXO3' });
        // Update StatusBar.
        DTG.View.updateStatusBar('Generar > Reporte [Anexo No. 3]');
    }
});