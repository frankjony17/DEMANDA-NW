
Ext.define('DTG.controller.PersonaController', {
    extend: 'Ext.app.Controller',

    control: {
        'persona-grid': {
            afterrender: "afterRender",
            celldblclick: "dblclick"
        },
        'persona-grid [text=Adicionar]': {
            click: "showWindows"
        },
        'persona-grid [text=Eliminar]': {
            click: "confirm"
        },
        'persona-form': {
            afterrender: "afterRenderWindows"
        },
        'persona-form [text=Salvar]': {
            click: "isValid"
        },
        'persona-form [text=Editar]': {
            click: "isValid"
        }
    },
    /* Methods */
    afterRender: function (grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
        this.gridToolTip(grid);
    },
    afterRenderWindows: function (win)
    {
        this.win = win;
        this.form = win.down('form');
    },
    /* Used in Add and Update > Is valid form? */
    isValid: function (btn)
    {
        if (this.form.getForm().isValid()){
            var record = this.form.getValues();
            /* On Add action */
            if (btn.text === "Salvar"){
                this.add(record, this.form.getForm(), this.store);
            } /* On Edit action */
            else {
                this.update(record, this.store, this.win);
            }
        } else {
            DTG.View.Msg.question('Atención', '<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.');
        }
    },
    /* Add */
    showWindows: function ()
    {
        Ext.create('DTG.view.persona.PersonaForm',{ autoShow: true, btnText: 'Salvar', title: 'Adicionar persona' });
    },
    add: function (record, form, store)
    {
        var telefono = '';
        /* Set telephone data */
        if (record['tele1']) { telefono += record['tele1']; }
        if (record['tele2']) { telefono.length > 0 ? telefono = telefono.concat(', ') : null; telefono += record['tele2']; }
        if (record['tele3']) { telefono.length > 0 ? telefono = telefono.concat(', ') : null; telefono += record['tele3']; }
        /* Set */
        DTG.Model.Persona.create({
            nombre: record['nombre'],
            apellidos: record['apellidos'],
            direccion: record['direccion'],
            ci: record['ci'],
            movil: record['movil'],
            telefonos: telefono,
            cargo_id: this.win.cargoId,
            empresa_id: this.win.empresaId,
            tipo_persona_id: this.win.personaTipoId
        }).then(DTG.OK(form, store, 'add')).catch(function(error){
            DTG.ERROR(error);
        });
    },
    /* Update */
    dblclick: function (view, td, cellIndex, record, tr, rowIndex)
    {
        var win = Ext.create('DTG.view.persona.PersonaForm',{btnText:'Editar',title:'Editar persona'}),
            form = win.down('form'),
            telefonos = '',
            /* Get Components */
            comb_car = form.down('[name=cargo]'),
            comb_suc = form.down('[name=empresa]'),
            comb_tip = form.down('[name=tipo_persona]'),
            telefon1 = form.down('[name=tele1]'),
            telefon2 = form.down('[name=tele2]'),
            telefon3 = form.down('[name=tele3]');
        /* Load data from grid on form */
        form.loadRecord(record);
        comb_car.setValue(this.findValue(record.get('cargo_id'), 'cargo'));
        comb_suc.setValue(this.findValue(record.get('empresa_id'), 'empresa'));
        comb_tip.setValue(this.findValue(record.get('tipo_persona_id'), 'tipo_persona'));
        /* Set telephone values */
        if(record.get('telefonos')){
            telefonos = record.get('telefonos').split(', ');
            if(telefonos[0]) { telefon1.setValue(telefonos[0]); }
            if(telefonos[1]) { telefon2.setValue(telefonos[1]); }
            if(telefonos[2]) { telefon3.setValue(telefonos[2]); }
        }
        /* FKey */
        win.cargoId = record.get('cargo_id');
        win.empresaId = record.get('empresa_id');
        win.personaTipoId = record.get('tipo_persona_id');
        /* Show Windows */
        win.show();
    },
    update: function (record, store, win)
    {
        var telefono = '';
        /* Set telephone data */
        if (record.tele1) { telefono += record.tele1; }
        if (record.tele2) { telefono.length > 0 ? telefono = telefono.concat(', ') : null; telefono += record.tele2; }
        if (record.tele3) { telefono.length > 0 ? telefono = telefono.concat(', ') : null; telefono += record.tele3; }
        /* Update */
        DTG.Model.Persona.update({
            nombre: record.nombre,
            apellidos: record.apellidos,
            direccion: record.direccion,
            ci: record.ci,
            movil: record.movil,
            telefonos: telefono,
            cargo_id: win.cargoId,
            empresa_id: win.empresaId,
            tipo_persona_id: win.personaTipoId
        },{ where: { id: record.id } }).then(DTG.OK(win, store, 'update')).catch(function(error){
            DTG.ERROR(error);
        });
    },
    /* Remove */
    confirm: function ()
    {
        if (this.grid.selModel.getCount() >= 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registro seleccionado?', this.remove, this);
        } else {
            DTG.View.Msg.question('Atención', 'Seleccione el o los registro que desea eliminar.');
        }
    },
    remove: function (confirm)
    {
        if (confirm === 'yes') {
            Ext.Array.each(this.grid.selModel.getSelection(), function (row) {
                DTG.Model.Persona.destroy({ where:{ id: row.get('id') } });
            });
            this.grid.store.load();
        }
    },
    /* Find value in the grid by one value */
    findValue: function (id, column)
    {
        var record = this.store.findRecord(column+'_id', id);
        return record.get(column);
    },
    /* ToolTips */
    gridToolTip: function (grid)
    {
        var view = grid.getView();

        Ext.create('Ext.tip.ToolTip', {
            target: view.el,
            delegate: view.itemSelector,
            trackMouse: true,
            listeners: {
                beforeshow: function (tip) {
                    var tipo = view.getRecord(tip.triggerElement).get('tipo_persona'), t;
                    if (tipo.trim() === 'Usuario') {
                        t = '(<b>U</b> > Usuario o Cliente)';
                    } else if (tipo.trim() === 'Trabajador') {
                        t = '(<b>T</b> > Trabajador de ETECSA)';
                    } else {
                        t = '(<b>O</b> > Otro tipo de persona)';
                    }
                    tip.update('Tipo: <b>' + tipo.trim() +'</b>. '+ t);
                }
            }
        });
    }
});