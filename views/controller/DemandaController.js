
Ext.define('DTG.controller.DemandaController', {
    extend: 'Ext.app.Controller',

    control: {
        'demanda-grid': {
            beforerender: "beforeRenderGrid",
            itemcontextmenu: "itemContextMenu"
        },
        'demanda-grid [text=Adicionar]': {
            click: "showWindows"
        },
        //'demanda-grid [name=search]': {
        //    click: "demandaFiltro"
        //},
        'demanda-grid [name=refresh]': {
            click: "loadStore"
        },
        /* form */
        'demanda-form': {
            afterrender: "afterRenderWindows"
        },
        'demanda-form button[name=clear-filters]': {
            click: "clearFiltersForm"
        },
        'demanda-form button[text=Salvar]': {
            click: "isValid"
        },
        /* Edit */
        'edit-demanda-form button[text=Editar]': {
            click: "updateDemanda"
        },
        /* Edit Periodo Guerra */
        'edit-demanda-periodo-guerra-form': {
            close: "cleanData",
            render: "afterRenderPeriodoGuerraWindow",
            actioncolumnClick: "removeRowPeriodoGuerraForm"
        },
        'edit-demanda-periodo-guerra-form [xtype=combobox]': {
            select: "addPeriodoGuerraForm"
        },
        'edit-demanda-periodo-guerra-form button[text=Editar]': {
            click: "updatePeriodoGuerraDemanda"
        }
    },
    /* Methods */
    beforeRenderGrid: function(grid){
        this.grid = grid;
        this.store= grid.getStore();
    },
    /* Form Demanda and components */
    afterRenderWindows: function(win){
        this.win = win;
        this.form = win.down('form');
    },
    loadStore: function(){
        this.store.load();
    },
    clearFiltersForm: function(){
        this.empresaStore.clearFilter();
        this.organismoStore.clearFilter();
        this.form.down('[emptyText=Sector]').setValue();
        this.form.down('[fieldLabel=Empresa]').setValue();
        this.form.down('[emptyText=Organismo]').setValue();
        this.form.down('[title=Filtrar (Sector/Organismo)]').collapse();
    },
    /* Used in Add and Update > Is valid form? */
    isValid: function(){
        if (this.form.getForm().isValid()){
            var record = this.form.getValues();
            /* On Add action */
            this.add(record, this.store, this.win);
        } else {
            DTG.View.Msg.question('Atención', '<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.');
        }
    },
    /* Add */
    showWindows: function(){
        Ext.create('DTG.view.demanda.DemandaForm', {
            autoShow:true,
            btnText:'Salvar',
            title:'Adicionar Demanda'
        });
    },
    add: function(record, store, win){
        var date = new Date, criteria = "", me = this;

        for(var i = 0; i < record['periodo_guerra'].length; i++){
            criteria += "periodo_guerra_id = "+ record['periodo_guerra'][i];
            (i + 1) <  record['periodo_guerra'].length ? criteria += " OR " : criteria;
        }
        var query = "SELECT COUNT(demanda.id) AS count FROM demanda INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id WHERE empresa_id = "+ record['empresa'] +" AND year = '"+ date.getFullYear() +"' AND ("+ criteria +");";

        DTG.Sequelize.query(query, { type: DTG.Sequelize.QueryTypes.SELECT }).then(function(value){
            if (value[0].count === 0) {
                add()
            } else {
                DTG.View.Msg.question('Atención', 'Esta <b>Empresa</b> ya tiene asociado uno o varios de los Periodos de Guerra solicitados en el año <b>'+ date.getFullYear() +'</b>.<br><br><span style="color: red"><b>Nota:</b></span><br>Usted puede agregar nuevos servicios y productos a una demanda existente. <b>(Ver Ayuda)</b>');
            }
        });
        /* Adicionar Demanda > DemandaPeriodoGuerra */
        function add () {
            DTG.Model.Demanda.create({
                fechaSolicitud: record['fecha_solicitud'],
                year: String(date.getFullYear()),
                estado: 'PENDIENTE',
                empresa_id: record['empresa']
            }).then(function (demanda) {
                /* Add PeriodoGuerra */
                record['periodo_guerra'].forEach(function (id) {
                    DTG.Model.PeriodoGuerra.findById(id).then(function(periodoGuerra){
                        demanda.addPeriodosGuerra(periodoGuerra);
                    });
                });
                DTG.OK(win, store, '');
                me.loadStoreByTime(3)
            }).catch(function(error){
                DTG.ERROR(error)
            });
        }
    },
    /* Update */
    itemContextMenu: function(view, record, item, index, e){
        var me = this, menu = Ext.create('Ext.menu.Menu', {
            closeAction: 'destroy',
            width: 250,
            plain: true,
            items: [{
                text: 'Editar <b>[Demanda]</b>',
                iconCls: 'demanda-edit'
            },{
                text: 'Editar <b>[Periodo de Guerra]</b>',
                iconCls: 'demanda-periodo-guerra-edit'
            },'-',{
                text: 'Eliminar <span style="color:red"><b>[Demanda]</b></span>',
                iconCls: 'delete-row'
            },'-',{
                text: record.get('estado') === 'PENDIENTE'? 'Demanda: <span style="color:red"><b>"SATISFECHA"</b></span>' : 'Demanda <span style="color:red"><b>"PENDIENTE"</b></span>',
                iconCls: record.get('estado') === 'PENDIENTE'? 'demanda-satisfecha' : 'demanda-pendiente'
            }],
            listeners: {
                click: function (menu, item) {
                    switch (item.iconCls) {
                        case 'demanda-edit':
                            me.showUpdateDemanda(record);
                            break;
                        case 'demanda-periodo-guerra-edit':
                            me.showDemandaPeriodoGuerra(record);
                            break;
                        case 'delete-row':
                            me.confirm(record);
                            break;
                        case 'demanda-pendiente':
                            me.demandaEstado(record.get('id'), 'PENDIENTE');
                            break;
                        case 'demanda-satisfecha':
                            me.demandaEstado(record.get('id'), 'SATISFECHA');
                            break;
                    }
                }
            }
        });
        menu.showAt(e.getXY());
    },
    /* Show Form Edit Demanda */
    showUpdateDemanda: function(record, empresaId){
        var win = Ext.create('DTG.view.demanda.solicitud.EditDemandaForm',{
                fkey: record.get('id'),
                empresaId: record.get('empresa_id'),
                fechaSolicitud: new Date(record.get('fecha_solicitud'))
            }),
            form = win.down('[form]'),
            cbox = form.down('[xtype=combobox]'),
            date = form.down('[xtype=datefield]');
        /* Load data from grid */
        cbox.setValue(record.get('empresa'));
        date.setValue(new Date(record.get('fecha_solicitud')));
        /* Show Windows */
        win.show();
    },
    /* Update Demanda */
    updateDemanda: function(btn){
        var win = btn.up('window'), me = this, date = new Date();
        /* Exist Demanda??> */
        DTG.Model.Demanda.findAll({
            attributes: [[DTG.Sequelize.fn('COUNT', DTG.Sequelize.col('id')), 'count']],
            where: { year: String(date.getFullYear()), empresa_id: win.empresaId, id: { $ne: win.fkey } }
        }).then(function (demanda) {
            if (demanda[0].dataValues.count === 0) {
                update();
            } else {
                DTG.View.Msg.question('Atención', 'Ya existe una demanda para esta empresa en el año <b>'+ date.getFullYear() +'</b>.<br><br><span style="color: red"><b>Nota:</b></span><br>Usted puede agregar nuevos servicios y productos a una demanda existente. <b>(Ver Ayuda)</b>');
            }
        });
        /* Update Demanda */
        function update () {
            DTG.Model.Demanda.update({
                fechaSolicitud: win.fechaSolicitud,
                empresa_id: win.empresaId
            },{ where: { id: win.fkey } }).then(function(){
                DTG.OK(win, me.store, 'update');
            }).catch(function(error){
                DTG.ERROR(error)
            });
        }
    },
    /* Show Periodo Guerra */
    showDemandaPeriodoGuerra: function (record){
        var criteria = [], win = Ext.create('DTG.view.demanda.solicitud.EditDemandaPeriodoGuerraForm', { demandaId: record.get('id') });
        /* Get PeriodoGuerra Ids */
        record.get('periodo_guerra_ids').forEach(function (id) {
            criteria.push({ id: id });
        });
        /* Find all PeriodoGuerra where id = id1 or id = id2 or ..... */
        DTG.Model.PeriodoGuerra.findAll({
            where: { $or: criteria }
        }).then(function (periodosGuerra) {
            var myData = [];
            periodosGuerra.forEach(function(pg){
                myData.push([pg.id, pg.etapa, pg.descripcion]);
            });
            win.myData = myData;
            win.gridPeriodoGuerraStore.loadData(myData);
            win.show();
        }).catch(function (err) {
            DTG.ERROR(err);
        });
    },
    afterRenderPeriodoGuerraWindow: function(win){
        this.winPeriodoGuerra = win;
        this.gridPeriodoGuerraStore = win.gridPeriodoGuerraStore;
    },
    addPeriodoGuerraForm: function(combo, record){
        if (this.inArray(record.get('id'))){
            this.winPeriodoGuerra.myData.push([record.get('id'), record.get('etapa'), record.get('descripcion')]);
            this.loadData();
        }
    },
    inArray: function(id){
        for (var i = 0; i < this.winPeriodoGuerra.myData.length; i++){
            if (this.winPeriodoGuerra.myData[i][0] === id){
                return false;
            }
        }
        return true;
    },
    loadData: function(){
        this.gridPeriodoGuerraStore.loadData(this.winPeriodoGuerra.myData);
    },
    cleanData: function(){
        this.winPeriodoGuerra.myData = [];
        this.loadData();
    },
    removeRowPeriodoGuerraForm: function(value){
        var me = this, grid = value[0], rowIndex = value[1], record = grid.getStore().getAt(rowIndex);
        for(var i = 0; i < me.winPeriodoGuerra.myData.length; i++){
            if(me.winPeriodoGuerra.myData.length > 1){
                if(me.winPeriodoGuerra.myData[i][0] === record.data.id){
                    me.winPeriodoGuerra.myData.splice(i, 1);
                    return me.loadData();
                }
            } else {
                DTG.View.Msg.info('Atención', 'La Demanda debe tener asociada al menos un Periodo de Guerra.')
            }
        }
    },
    /* Update Periodo Guerra */
    updatePeriodoGuerraDemanda: function(btn){
        var me = this;
        DTG.Model.Demanda.findById(me.winPeriodoGuerra.demandaId).then(function (demanda) {
            /* Get PeriodoGuerra from Demanda */
            console.log(demanda);
            demanda.getPeriodosGuerra().then(function (periodosGuerra) {
                /* Remove PeriodoGuerra from Demanda */
                periodosGuerra.forEach(function (periodoGuerra) {
                    periodoGuerra.demanda_periodo_guerra.destroy();
                });
            });
            /* Add new PeriodoGuerra to Demanda */
            me.winPeriodoGuerra.myData.forEach(function (rec) {
                /* Get PeriodoGuerra by Id */
                DTG.Model.PeriodoGuerra.findById(rec[0]).then(function (periodoGuerra) {
                    demanda.addPeriodosGuerra(periodoGuerra);
                });
                me.loadStoreByTime(2, me.winPeriodoGuerra);
            });
        }).catch(function (err) {
            DTG.ERROR(err);
        });
    },
    /* Remove rmove */
    confirm: function(record){
        this.demandaId = record.get('id');

        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registro seleccionado?', confirm, this);

        function confirm (btn) {
            if (btn === 'yes') {
                var msg = "<span style='font-size: 18px;'>Tenga en cuenta que esta Demanda puede tener asociada varias solicitudes de Servicios y Productos.<br><br>" +
                    "<span style='color: red'><b>¡¡¡De eliminarse la demanda se perderá esta información!!!</b></span><br><br>" +
                    "<b><u>Servicios y Productos asociados:</u><br>" +
                    "SERVICIOS = <span style='color: red;'>"+ record.get('cantidad_servicio') +"</span>.<br>" +
                    "PRODUCTOS = <span style='color: red'>"+ record.get('cantidad_producto') +"</span>.</b></span>";
                Ext.MessageBox.confirm('Atención', msg, this.remove, this);
            }
        }
    },
    remove: function(confirm){
        var me = this;
        if(confirm === 'yes'){
            DTG.Model.Demanda.destroy({ where:{ id: me.demandaId } });
            this.loadStore();
        }
    },
    /**/
    demandaEstado: function (id, estado) {
        var me = this;
        DTG.Model.Demanda.update({
            estado: estado
        },{ where: { id: id } }).then(function(){
            me.loadStore();
        }).catch(function(error){
            DTG.ERROR(error)
        });
    },
    /* Load Store after the time */
    loadStoreByTime: function(time, win){
        var me = this;

        if(win){
            win.down("[text=Editar]").setDisabled(true);
            win.down("[text=Cancelar]").setDisabled(true);
        }
        DTG.startTask(time, function(second){
            if(second == time){
                me.loadStore();
                if (win) {
                    win.close();
                }
            }
        });
    }
    //filterBy:function(item){var win=item.up('window'),tag=win.down('[xtype=tagfield]'),bool=true;if(win.tagData.length>0){for(var i=0;i<win.tagData.length;i++){if(win.tagData[i].id===item.val){var search=win.tagData[i].value.search(item.text);if(search===-1){win.tagData[i].value+=','+item.text;win.tagData[i].data+=','+item.ide;bool=false;}}}}if(bool){win.tagData.push({id:item.val,value:item.name+': '+item.text,data:item.ide});win.ids.push(item.val);}win.tagStore.loadData(win.tagData);tag.setValue(win.ids);},
    //inArray:function(id){for(var i=0;i<this.win.myData.length;i++){if(this.win.myData[i][0]===id){return false;}}return true;}
});