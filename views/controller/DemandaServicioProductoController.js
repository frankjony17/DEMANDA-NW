
Ext.define('DTG.controller.DemandaServicioProductoController', {
    extend: 'Ext.app.Controller',

    control: {
        'solicitud-servicio-producto-grid': {
            edit: "validAction",
            beforerender: "beforeRenderGrid",
            actioncolumn: "actionColumn"
        }
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
    loadStore: function() {
        this.store.load();
        this.win.store.load();
    },
    /* Methods */
    validAction: function (editor, context) {
        if (context.record.get('servicio_producto')) {
            if (context.record.get('id') === 'add') {
                if(this.validUnique(context.record.get('servicio_producto'), 'add')){
                    this.addServicioProducto(context.record);
                }
            } else {
                if(this.validUnique(context.record.get('servicio_producto'), context.record.get('id'))){
                    this.editServicioProducto(context.record);
                }
            }
        } else {
            this.msgQuestion('Atención', 'Formulario no válido, verifique el <b><span style="color:red;">Servicio</span> o <span style="color:#ff0000;">Producto</span></b>.');
        }
    },
    /* Add ServicioProducto */
    addServicioProducto: function (record) {
        var me = this;
        DTG.Model.ServicioProducto.findOne({
            where: {nombre: record.get('servicio_producto')}
        }).then(function(servicioProducto) {
            /* Add DemandaServicioProducto */
            DTG.Model.DemandaServicioProducto.create({
                um: record.get('um'),
                demanda_id: me.store.demandaId,
                servicio_producto_id: servicioProducto.get('id')
            }).then(function(){
                me.loadStore();
                DTG.View.toast('Creación OK', 'Operación realizada exitosamente.');
            }).catch(function(error){
                DTG.ERROR(error);
            });
        });
    },
    /* Edit ServicioProducto */
    editServicioProducto:function (record) {
        var me = this;
        DTG.Model.ServicioProducto.findOne({
            where: { nombre: record.get('servicio_producto')  }
        }).then(function(servicioProducto) {
            /* Add DemandaServicioProducto */
            DTG.Model.DemandaServicioProducto.update({
                um: record.get('um'),
                servicio_producto_id: servicioProducto.get('id')
            },{
                where: { id: record.get('id') }
            }).then(function(){
                me.loadStore();
                DTG.View.toast('Actualización OK', 'Operación realizada exitosamente.');
            }).catch(function(error){
                DTG.ERROR(error);
            });
        });
    },
    /* Find value in store */
    validUnique: function (value, action) {
        var me = this, i = 0;

        if(action === "add"){
            me.store.each(function(rec){if(rec.get('servicio_producto') === value){i++;}});
            if(i > 1){
                me.msgQuestion('Atención', 'Este Servicio o Producto ya esta asociado a la Demanda.');
                me.store.load();
                return false;
            }
        } else {
            me.store.each(function(rec){if(rec.get('servicio_producto') === value && rec.get('id') !== action){i++;}});
            if(i > 0){
                me.msgQuestion('Atención', 'Este Servicio o Producto ya esta asociado a la Demanda.');
                me.store.load();
                return false;
            }
        }
        return true;
    },
    /* Remove */
    remove: function (confirm){
        if (confirm === 'yes'){
            var me = this;
            DTG.Model.DemandaServicioProducto.destroy({ where:{ id: me.id } });
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