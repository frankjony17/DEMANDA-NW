
Ext.define('DTG.controller.EmpresaController', {
    extend: 'Ext.app.Controller',

    control: {
        'empresa-grid': { afterrender: "afterRender", celldblclick: "dblclick" },
        'empresa-grid [text=Adicionar]': { click: "showWindows" },
        'empresa-grid [text=Eliminar]': { click: "confirm" },
        'empresa-form': { afterrender: "afterRenderWindows" },
        'empresa-form [text=Salvar]': { click: "isValid" },
        'empresa-form [text=Editar]': { click: "isValid" }
    },
    afterRender: function (grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
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
        Ext.create('DTG.view.empresa.EmpresaForm',{autoShow:true,btnText:'Salvar',title:'Adicionar empresa'});
    },
    add: function (record, form, store)
    {
        var telefono = '';
        /* Set telephone data */
        if (record['tele1']) { telefono += record['tele1']; }
        if (record['tele2']) { telefono.length > 0 ? telefono = telefono.concat(', ') : null; telefono += record['tele2']; }
        /* Set */
        DTG.Model.Empresa.create({
            nombre: record['nombre'],
            acronimo: record['acronimo'],
            direccion: record['direccion'],
            correo: record['correo'],
            telefonos: telefono,
            organismo_id: this.win.organismoId
        }).then(DTG.OK(form, store, 'add')).catch(function(error){
            DTG.ERROR(error)
        });
    },
    /* Update */
    dblclick: function (view, td, cellIndex, record, tr, rowIndex)
    {
        var win = Ext.create('DTG.view.empresa.EmpresaForm',{btnText:'Editar',title:'Editar empresa'}),
            form=win.down('form'),
            telefonos = '',
            /* Get Components */
            comb=form.down('[name=organismo_id]'),
            telefon1 = form.down('[name=tele1]'),
            telefon2 = form.down('[name=tele2]');
        /* Load data from grid on form */
        form.loadRecord(record);
        comb.setValue(this.findValue(record.get('organismo_id')));
        /* Set telephone values */
        if(record.get('telefonos')){
            telefonos = record.get('telefonos').split(', ');
            if(telefonos[0]) { telefon1.setValue(telefonos[0]); }
            if(telefonos[1]) { telefon2.setValue(telefonos[1]); }
        }
        /* FKey */
        win.organismoId = record.get('organismo_id');
        /* Show Windows */
        win.show();
    },
    update: function (record, store, win)
    {
        var telefono = '';
        /* Set telephone data */
        if (record.tele1) { telefono += record.tele1; }
        if (record.tele2) { telefono.length > 0 ? telefono = telefono.concat(', ') : null; telefono += record.tele2; }
        /* Update */
        DTG.Model.Empresa.update({
            nombre: record.nombre,
            acronimo: record.acronimo,
            direccion: record.direccion,
            correo: record.correo,
            telefonos: telefono,
            organismo_id: this.win.organismoId
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
        if (confirm === 'yes')
        {
            Ext.Array.each(this.grid.selModel.getSelection(), function (row)
            {
                DTG.Model.Empresa.destroy({ where:{ id: row.get('id') } });
            });
            this.grid.store.load();
        }
    },
    /* Find value in the grid by one value */
    findValue: function (id)
    {
        var record = this.store.findRecord('organismo_id', id);
        return record.get('organismo');
    }
});