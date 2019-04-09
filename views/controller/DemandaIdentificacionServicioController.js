
Ext.define('DTG.controller.DemandaIdentificacionServicioController', {
    extend: 'Ext.app.Controller',

    control: {
        'identificacion-servicio-grid': {
            edit: "validAction",
            beforerender: "beforeRenderGrid",
            actioncolumn: "actionColumn"
        },
        'identificacion-servicio-grid button[name=load]': {
            click: "loadStore"
        },
        'solicitud-servicio-producto-grid': { itemclick: "itemClick" }
    },

    beforeRenderGrid: function(grid) {
        this.win = grid.up('window');
        this.grid = grid;
        this.store = grid.getStore();
    },
    actionColumn: function (record) {
        this.id = record.get('id');
        Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registro seleccionado?', this.remove, this);
    },
    itemClick: function(view, record, item, index, e) {
        this.win.down('[name=fieldset-servicio-producto]').setTitle("Servicios y Productos <b>["+ record.get('servicio_producto') +"]</b>");
        this.demandaServicioProductoId = record.get('id');
        this.store.loadStore(record.get('id'));
    },
    loadStore: function() {
        this.store.loadStore(this.demandaServicioProductoId);
        this.win.store.load();
    },
    /* Methods */
    validAction: function (editor, context) {
        if (context.record.get('identificacion')) {
            if (context.record.get('id') === 'add') {
                if(this.validUnique(context.record.get('identificacion'), 'add')){
                    this.addIdentificacionServicio(context.record);
                }
            } else {
                if(this.validUnique(context.record.get('identificacion'), context.record.get('id'))){
                    this.editIdentificacionServicio(context.record);
                }
            }
        } else {
            this.msgQuestion('Atención', 'Formulario no válido, verifique la <b><span style="color:red;">Identificación del Servicio</span></b>.');
        }
    },
    /* Add IdentificacionServicio */
    addIdentificacionServicio: function (record) {
        var me = this;

        console.log(record);

        /* Add DemandaPlazo */
        DTG.Model.DemandaPlazo.create({
            plazoSolicitado: record.get('plazo_solicitado'),
            plazoAprobado: record.get('plazo_aprobado'),
            estado: ''
        }).then(function(dp){
            /* Add IdentificacionServicio */
            DTG.Model.DemandaServicioIdentificacion.create({
                identificacion: record.get('identificacion'),
                direccionPostal: record.get('direccion_postal')? record.get('direccion_postal') : "Dirección",
                demanda_plazo_id: dp.get('id'),
                demanda_servicio_producto_id: me.demandaServicioProductoId
            }).then(function(){
                me.loadStore();
                DTG.View.toast('Creación OK', 'Operación realizada exitosamente.');
            }).catch(function(error){
                DTG.ERROR(error);
            });
        }).catch(function(error){
            DTG.ERROR(error);
        });
    },
    /* Edit IdentificacionServicio */
    editIdentificacionServicio: function (record) {
        var me = this;
        /* Demanda Plaso */
        DTG.Model.DemandaPlazo.update({
            plazoSolicitado: record.get('plazo_solicitado'),
            plazoAprobado: record.get('plazo_aprobado')
        },{
            where: { id: record.get('demanda_plazo_id') }
        }).catch(function(error){
            DTG.ERROR(error);
        });
        /* Demanda Servicio Producto */
        DTG.Model.DemandaServicioIdentificacion.update({
            identificacion: record.get('identificacion'),
            direccionPostal: record.get('direccion_postal')
        },{
            where: { id: record.get('id') }
        }).then(function(){
            me.loadStore();
            DTG.View.toast('Actualización OK', 'Operación realizada exitosamente.');
        }).catch(function(error){
            DTG.ERROR(error);
        });
    },
    /* Find value in store */
    validUnique: function (value, action) {
        var me = this, i = 0;

        if(action === "add"){
            me.store.each(function(rec){if(rec.get('identificacion') === value){i++;}});
            if(i > 1){
                me.msgQuestion('Atención', 'Ya existe ina Identificación de Servicio/Producto con este nombre.');
                me.loadStore();
                return false;
            }
        } else {
            me.store.each(function(rec){if(rec.get('identificacion') === value && rec.get('id') !== action){i++;}});
            if(i > 0){
                me.msgQuestion('Atención', 'Ya existe ina Identificación de Servicio/Producto con este nombre.');
                me.loadStore();
                return false;
            }
        }
        return true;
    },
    /* Remove */
    remove: function (confirm){
        if (confirm === 'yes'){
            var me = this;
            DTG.Model.DemandaServicioIdentificacion.destroy({ where:{ id: me.id } });
            me.loadStore();
        }
    },
    /* Msg Window */
    msgQuestion: function (title, message){
        Ext.create('Ext.window.Window', {
            autoShow: true,
            alwaysOnTop: true,
            resizable: false,
            modal: true,
            title: title,
            html: '<table><tr style="height:4px"></trst><tr><td><img src="resources/images/icon-question.png"/></td><td>'+message+'</td></tr></table>',
            width: 390,
            height: 150,
            buttonAlign: 'center',
            buttons: [{
                text: 'Aceptar',
                handler: function(btn) {
                    btn.up('window').close();
                }
            }]
        });
    }
});