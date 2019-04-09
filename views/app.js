/*
 DTG 1.0.0
 Created on : 19-nov-2015, 22:49:56
 Author     : Frank Ricardo R.
 */
Ext.application({
    name: 'DTG',
    appFolder: 'views',

    controllers: [
        "BaseController",
        "ViewportController",
        //"AdminController",
        "EmpresaController",
        "PersonaController",
        "DemandaController",
        "SolicitudDemandaController",
        "DemandaServicioProductoController",
        "DemandaIdentificacionServicioController",
        "ReporteController"
    ],
    launch : function()
    {
        Ext.create('DTG.view.Viewport');
    }
});

