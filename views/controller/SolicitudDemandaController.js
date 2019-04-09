
Ext.define('DTG.controller.SolicitudDemandaController', {
    extend: 'Ext.app.Controller',

    control: {
        'solicitud-demanda-window': {
            close: "close",
            resize: "resize",
            beforerender: "beforeRenderWindow"
        },
        'solicitud-demanda-window button[name=filtro-solicitante]': {
            click: "filtroSolicitanteClick"
        },
        'solicitud-demanda-window button[name=filtro-aprobado-por]': {
            click: "filtroAprobadoPorClick"
        },
        'solicitud-demanda-window combobox[name=solicitante]': {
            select: "addSolicitantePersona"
        },
        'solicitud-demanda-window combobox[name=aprobado-por]': {
            select: "addSolicitantePersona"
        },
        'solicitud-servicio-producto-grid': {
            expand: "expandGrid"
        },
        'identificacion-servicio-grid': {
            expand: "expandGrid"
        },
        'solicitud-servicio-producto-grid button[name=add]': {
            click: "addServicioProducto"
        },
        'solicitud-servicio-producto-grid button[name=collapse]': {
            click: "collapseGridServicioProducto"
        },
        'identificacion-servicio-grid button[name=collapse]': {
            click: "collapseGridIdentificacionServicio"
        },
        'identificacion-servicio-grid button[name=add]': {
            click: "addIdentificacionServicioProducto"
        }
    },
    beforeRenderWindow: function(win) {
        this.win = win;
        this.form = win.down('form');
        this.demandaId = win.demandaId;
    },
    resize: function (win, width, height) {
        var gridIdeSer = this.form.down('[xtype=identificacion-servicio-grid]'),
            gridSerPro = this.form.down('[xtype=solicitud-servicio-producto-grid]');
        /* Crash your head, sink!!! */
        var heightSerPro = 26 * height / 100,
            heightIdeSer = 44.5 * height / 100;
        /* Crash your head, sink!!! */
        if ((heightSerPro + heightIdeSer + 90) < (height - 107)) {
            var res = (height - 107) - (heightSerPro + heightIdeSer + 90);
            heightSerPro += res / 2;
            heightIdeSer += res / 2;
        }
        gridSerPro.setHeight(heightSerPro);
        gridIdeSer.setHeight(heightIdeSer);
    },
    close: function () {
        var win1 = Ext.getCmp('window-filter-cargo-filtro-solicitante'),
            win2 = Ext.getCmp('window-filter-cargo-filtro-aprobado-por');
        if (win1) {
            win1.close();
        }
        if (win2) {
            win2.close();
        }
    },
    /* Methods */
    filtroSolicitanteClick: function (btn) {
        this.showFormCargo(btn);
        btn.setDisabled(true);
    },
    filtroAprobadoPorClick: function (btn) {
        this.showFormCargo(btn);
        btn.setDisabled(true);
    },
    showFormCargo: function (btn) {
        var me = this, win = Ext.getCmp('window-filter-cargo-'+btn.name);
        if (win) {
            win.show();
        } else {
            Ext.create('Ext.window.Window',{x:btn.getX()-387,y:btn.getY()-110,id:'window-filter-cargo-'+btn.name,width:420,title:'Filtrar por CARGO',layout:'fit',iconCls:'fa fa-search',autoShow:true,resizable:false,closeAction:'destroy',alwaysOnTop:true,headerPosition:'bottom',items:[{xtype:'form',padding:'5 0 0 5',items:[{xtype:'combobox',emptyText:'Cargo',store:Ext.create('DTG.store.CargoStore'),queryMode:'local',displayField:'nombre',editable:false,listConfig:{itemTpl:['<div data-qtip="{descripcion}">{nombre}</div>']},margin:'0 5 5 0',anchor:'100%',
                listeners: {
                    select: function (cmb) {
                        if (btn.name === 'filtro-solicitante') {
                            me.win.solicitanteStore.clearFilter();
                            me.win.solicitanteStore.filter({property: 'cargo', value: cmb.value});
                            me.win.solicitanteStore.filter({property: 'tipo_persona', value: 'Usuario'});
                            me.win.solicitanteStore.filter({property: 'empresa', value: me.win.empresa });
                        }
                        if (btn.name === 'filtro-aprobado-por') {
                            me.win.personaApruStore.clearFilter();
                            me.win.personaApruStore.filter({property: 'cargo', value: cmb.value});
                            me.win.personaApruStore.filter({property: 'tipo_persona', value: 'Trabajador'});
                        }
                        this.up('window').hide();
                    }
                }}]}],listeners:{hide:function(){btn.setDisabled(false);},close:function(){btn.setDisabled(false);}}
            });
        }
    },
    /* Add Servicio/Producto */
    addServicioProducto: function (btn) {
        var grid = btn.up('grid');

        grid.getStore().insert(0, {'id': 'add'});

        grid.cellEditing.startEditByPosition({
            row: 0,
            column: 1
        });
    },
    /* Add Identificacion Servicio/Producto */
    addIdentificacionServicioProducto: function (btn) {
        var grid = btn.up('grid');

        grid.getStore().insert(0, {'id': 'add', 'plazo_solicitado': new Date()});

        grid.cellEditing.startEditByPosition({
            row: 0,
            column: 1
        });
    },
    /* Collapse/Expand Grid */
    collapseGridServicioProducto: function (btn) {
        var win = btn.up('window'),
            grid1 = btn.up('grid'), gridIdeSer = this.form.down('[xtype=identificacion-servicio-grid]');
        /* Crash your head, sink!!! */
        var heightIdeSer = 0;
        /* Crash your head, sink!!! */
        if ((heightIdeSer + 90) < (win.getHeight() - 107)) {
            var res = (win.getHeight() - 155) - (heightIdeSer + 90);
            heightIdeSer += res;
        }
        grid1.setCollapsed(true);
        gridIdeSer.setHeight(heightIdeSer);
    },
    collapseGridIdentificacionServicio: function (btn) {
        var win = btn.up('window'),
            grid1 = btn.up('grid'), gridSerPro = this.form.down('[xtype=solicitud-servicio-producto-grid]');
        /* Crash your head, sink!!! */
        var heightSerPro = 0;
        /* Crash your head, sink!!! */
        if ((heightSerPro + 90) < (win.getHeight() - 107)) {
            var res = (win.getHeight() - 155) - (heightSerPro + 90);
            heightSerPro += res;
        }
        grid1.setCollapsed(true);
        gridSerPro.setHeight(heightSerPro);
    },
    expandGrid: function (btn) {
        var win = btn.up('window');
        this.resize(win, win.getWidth(), win.getHeight());
    },
    /* Add/Update Combos: Solicitante/AprobadoPor*/
    addSolicitantePersona: function (cmb) {
        var me = this, query, tipo, persona_id = cmb.getValue(), demanda_id = me.demandaId;
        /* Criteria for Query */
        if (cmb.name === 'solicitante') {
            tipo = "Usuario";
        }
        if (cmb.name === 'aprobado-por') {
            tipo = "Trabajador";
        }
        /* Query Demanda Persona */
        query = "SELECT persona_id AS id FROM demanda_persona INNER JOIN persona ON persona.id = demanda_persona.persona_id INNER JOIN persona_tipo ON persona_tipo.id = persona.tipo_persona_id WHERE demanda_persona.demanda_id = "+ demanda_id +" AND persona_tipo.nombre = '"+ tipo +"';";
        /* Execute query */
        DTG.Sequelize.query(query, { type: DTG.Sequelize.QueryTypes.SELECT }).then(function (demandaPersona) {
            if (demandaPersona[0]) {
                update(demandaPersona[0].id)
            } else {
                add();
            }
            me.win.store.load();
        }).catch(function (error) {
            DTG.ERROR(error);
        });
        /* INSERT demanda_persona */
        function add () {
            var query = "INSERT INTO demanda_persona (persona_id, demanda_id) VALUES ("+ persona_id +", "+ demanda_id +");";
            DTG.Sequelize.query(query).catch(function (error) {
                DTG.ERROR(error);
            });
        }
        /* UPDATE demanda_persona */
        function update (id) {
            var query = "UPDATE demanda_persona SET persona_id = "+ persona_id +" WHERE demanda_id = "+ demanda_id +" AND persona_id = "+ id +";";
            DTG.Sequelize.query(query).catch(function (error) {
                DTG.ERROR(error);
            });
        }
    }
});