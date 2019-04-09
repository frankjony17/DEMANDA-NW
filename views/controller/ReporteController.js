
Ext.define('DTG.controller.ReporteController', {
    extend: 'Ext.app.Controller',

    control: {
        'reporte-window': { afterrender: "afterRender" },
        'reporte-window [action=save-pdf]': { click: "clickAnexo3" },
        '#report-m-normal': { click: "marginNormal" },
        '#report-m-estrecho': { click: "marginEstrecho" },
        '#report-m-moderado': { click: "marginModerado" },
        '#report-align-vertical': { click: "alignVertical" },
        '#report-align-horizontal': { click: "alignHorizontal" },
        '#report-carta': { click: "pageCarta" },
        '#report-a4': { click: "pageA4" },
        '#pdf-save-bottom': { click: "getPDF" }
    },
    afterRender: function (win) {
        this.win = win;
        /* Page config */
        this.pageConfig = { orientation: "Landscape", pageSize: "Letter", margin: { top: 25, left: 30, right: 30, bottom: 25} };
        this.margin = "Normal";
        this.orientation = "Horizontal";
        this.page = "Carta";
        this.updateText();
        /* load html */
        switch (win.name) {
            case 'ANEXO3':
                win.update('<div class="report">'+ DTG.writeHtml("reports/ModeloResumenAnexo3.html", "") +'</div>');
                this.pageConfig.title = "ModeloResumenAnexo3";
                break;
            default:
                break;
        }
    },
    /* Margin config */
    marginNormal: function () {
        this.pageConfig.margin = { top: 25, left: 30, right: 30, bottom: 25};
        this.margin = "Normal";
        this.updateText();
    },
    marginEstrecho: function () {
        this.pageConfig.margin = { top: 12.7, left: 12.7, right: 12.7, bottom: 12.7};
        this.margin = "Estrecho";
        this.updateText();
    },
    marginModerado: function () {
        this.pageConfig.margin = { top: 25.4, left: 19.1, right: 19.1, bottom: 25.4};
        this.margin = "Moderado";
        this.updateText();
    },
    /* Align page config */
    alignVertical: function () {
        this.pageConfig.orientation = "Portrait";
        this.orientation = "Vertical";
        this.updateText();
    },
    alignHorizontal: function () {
        this.pageConfig.orientation = "Landscape";
        this.orientation = "Horizontal";
        this.updateText();
    },
    /* Page config */
    pageCarta: function () {
        this.pageConfig.pageSize = "Letter";
        this.page = "Carta";
        this.updateText();
    },
    pageA4: function () {
        this.pageConfig.pageSize = "A4";
        this.page = "A4";
        this.updateText();
    },
    /* Show page config in toolbar window */
    updateText: function () {
        var tbtext = this.win.down('[id=tbtext-page-config]');
        tbtext.update('<div class="report-tbtext"><h3>' +
            'Tamaño: '+ this.page +' | ' +
            'Orientación: '+ this.orientation +' | ' +
            'Márgenes: '+ this.margin +'' +
            '</h3></div>');
    },
    /* Get PDF */
    getPDF: function () { DTG.pdf(this.pageConfig); }
});