/**
 * Generic Controller from all grid an form > Actions: Add, Update and Remove.
 */
Ext.define('DTG.controller.BaseController', {
    extend: 'Ext.app.Controller',

    control: {
        /* Sector */
        'sector-grid': { resize: "resize"/*, afterrender: "afterRender", celldblclick: "dblclick"*/ },
        //'sector-grid [text=Adicionar]': { click: "showWindows" },
        //'sector-grid [text=Eliminar]': { click: "confirm" },
        //'sector-form': { afterrender: "afterRenderWindows" },
        //'sector-form [text=Salvar]': { click: "isValid" },
        //'sector-form [text=Editar]': { click: "isValid" },
        /* Organismo */
        'organismo-grid': { resize: "resize", afterrender: "afterRender", celldblclick: "dblclick" },
        'organismo-grid [text=Adicionar]': { click: "showWindows" },
        'organismo-grid [text=Eliminar]': { click: "confirm" },
        'organismo-form': { afterrender: "afterRenderWindows" },
        'organismo-form [text=Salvar]':{ click: "isValid" },
        'organismo-form [text=Editar]': { click: "isValid" },
        /* Empresa */
        'empresa-grid': { resize: "resize" },
        /* Cargo */
        'cargo-grid': { resize: "resize", afterrender: "afterRender", celldblclick: "dblclick" },
        'cargo-grid [text=Adicionar]': { click: "showWindows" },
        'cargo-grid [text=Eliminar]': { click: "confirm" },
        'cargo-form': { afterrender: "afterRenderWindows" },
        'cargo-form [text=Salvar]':{ click: "isValid" },
        'cargo-form [text=Editar]': { click: "isValid" },
        /* Persona */
        'persona-grid': { resize: "resize" },
        /* TipoPersona */
        'persona-tipo-grid': { resize: "resize"/*, afterrender: "afterRender", celldblclick: "dblclick"*/ },
        //'persona-tipo-grid [text=Adicionar]': { click: "showWindows" },
        //'persona-tipo-grid [text=Eliminar]': { click: "confirm" },
        //'persona-tipo-form': { afterrender: "afterRenderWindows" },
        //'persona-tipo-form [text=Salvar]':{ click: "isValid" },
        //'persona-tipo-form [text=Editar]': { click: "isValid" },
        /* PeriodoGuerra */
        'periodo-guerra-grid': { resize: "resize"/*, afterrender: "afterRender", celldblclick: "dblclick"*/ },
        //'periodo-guerra-grid [text=Adicionar]': { click: "showWindows" },
        //'periodo-guerra-grid [text=Eliminar]': { click: "confirm" },
        //'periodo-guerra-form': { afterrender: "afterRenderWindows" },
        //'periodo-guerra-form [text=Salvar]':{ click: "isValid" },
        //'periodo-guerra-form [text=Editar]': { click: "isValid" },
        /* ServicioProducto */
        'servicio-producto-grid': { resize: "resize", afterrender: "afterRender", celldblclick: "dblclick" },
        'servicio-producto-grid [text=Adicionar]': { click: "showWindows" },
        'servicio-producto-grid [text=Eliminar]': { click: "confirm" },
        'servicio-producto-form': { afterrender: "afterRenderWindows" },
        'servicio-producto-form [text=Salvar]': { click: "isValid" },
        'servicio-producto-form [text=Editar]': { click: "isValid" },
        /* Demanda */
        'demanda-grid': { resize: "resize" },
    },
    /* Methods */
    resize: function (grid)
    {
        grid.setHeight(DTG.View.getHeight('south-panel-id', 102));
    },
    afterRender: function (grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
        this.modelName = grid.modelName;
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
            var record = this.form.getValues(true, true);
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
        Ext.create('DTG.view.'+this.modelName.toLowerCase()+'.'+this.modelName+'Form',{autoShow:true,btnText:'Salvar',title:'Adicionar '+this.modelName.toLowerCase()+''});
    },
    add: function (string, form, store)
    {
        /* string = "key=value&key=value&key=value....n" */
        var record = string.split('&');/* record = [key=value, key=value, key=value, ..., n] */
        /* object > String */
        var object = 'DTG.Model.'+this.modelName+'.create({';
        /* Prepared key an value by Model.create > Ej: DTG.Model.NAME.create({ key: 'value'}) */
        for (var i = 0; i < record.length; i++) {
            var array = record[i].split('='), split = array[1].split("%20"), value = '';
            /* Deleting "%20" > value from encoding */
            split.forEach(function(v){ value += v.concat(' '); });
            /* object += "key:'value'" */
            object += array[0] +':\''+ decodeURIComponent(value.trim()) +'\'';
            /* Add "," */
            if (record.length != i+1) {
                object += ',';
            }
        }
        object += '}).then(function(){DTG.View.toast(\'Creación OK\',\'Operación realizada exitosamente.\');form.reset();store.load();}).';
        object += 'catch(function(error){if(error.message==="Validation error"){';
        object += 'DTG.View.Msg.question(\'Atención\',\'Estos datos ya existen en la <b>Base de Datos</b>.\');}else{';
        object += 'DTG.View.Msg.error(\'Error\',error.toString());console.log(error);}});';
        /* Write JS code from string */
        eval(object);
    },
    /* Update */
    dblclick: function (view, td, cellIndex, record, tr, rowIndex)
    {
        var win = Ext.create('DTG.view.'+this.modelName.toLowerCase()+'.'+this.modelName+'Form',{btnText:'Editar',title:'Editar '+this.modelName.toLowerCase()+''});
        var form = win.down('form');
        var fields = record.getFields(), nameIds = [], string = '', me = this;
        /* Load data */
        form.loadRecord(record);
        /* Find combobox if exist and set value */
        fields.forEach(function(field){
            var fk = field.name.split('_id');
            if (fk.length === 2) {
                var combo = form.down('[name='+field.name+']');
                combo.setValue(me.findValue(field.name,record.get(field.name)));
                /* Get ids and save */
                nameIds.push([ fk[0]+'Id', record.get(field.name) ]);
            }
        });
        /* Save FK */
        nameIds.forEach(function(id){
            string += "win."+id[0]+"="+id[1];
        });
        eval(string);
        /* Show Windows */
        win.show();
    },
    update: function (string, store, win)
    {   /* string = "key=value&key=value&key=value....n" */
        /* string.split('&') = [key=value, key=value, key=value, ..., n] */
        var record = string.split('&'), id;
        /* object > String */
        var object = 'DTG.Model.'+this.modelName+'.update({';
        /* Prepared key an value by Model.create > Ej: DTG.Model.NAME.update({ key: 'value'}) */
        for (var i = 0; i < record.length; i++) {
            var array = record[i].split('='), name = array[0].split('_id'), split = array[1].split("%20"), value = '';
            /* Deleting "%20" > value from encoding */
            split.forEach(function(v){ value += v.concat(' '); });
            /* object += "key:'value'" */
            if (array[0] !== 'id' && name.length === 1) {
                object += array[0] +':\''+ decodeURIComponent(value.trim()) +'\'';
            }
            else if (array[0] === 'id') {
                id = value;
            } else {
                object += array[0] +':\''+ eval("win."+name[0]+"Id") +'\'';
            }
            /* Add "," */
            if (record.length != i+2) {
                object += ',';
            }
        }
        object += '},{where:{id:'+id+'}}).then(function(){DTG.View.toast(\'Actualización OK\',\'Operación realizada exitosamente.\');';
        object += 'store.load();win.close();}).catch(function(error){if(error.message==="Validation error"){';
        object += 'DTG.View.Msg.question(\'Atención\',\'Estos datos ya existen en la <b>Base de Datos</b>.\');';
        object += '}else{DTG.View.Msg.error(\'Error\',error.toString());console.log(error);}});';
        /* Write JS code from string */
        eval(object);
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
        var me = this;

        if (confirm === 'yes')
        {
            Ext.Array.each(me.grid.selModel.getSelection(), function (row)
            {
                eval('DTG.Model.'+me.modelName+'.destroy({where:{id:row.get(\'id\')}})');
            });
            me.grid.store.load();
        }
    },
    /* Find value in the grid by one value */
    findValue: function (key, id)
    {
        var record = this.store.findRecord(key, id), name = key.split('_id');
        return record.get(name[0]);
    }
});