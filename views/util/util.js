/* Metodos relacionados con las vistas. */
if(!DTG.View){DTG.View={};}

DTG.View.centerPanel=function(){
    return Ext.getCmp('center-panel-id')
};

DTG.View.add=function(component){
    var cp=DTG.View.centerPanel();
    cp.removeAll();
    cp.add(component);
};

DTG.View.remove=function(){
    cp=DTG.View.centerPanel();
    cp.removeAll();
};

DTG.View.setTitlePanel=function(id,title){
    var p=Ext.getCmp(id);
    p.setTitle(title);
};

DTG.View.collapsePanel=function(id){
    var p=Ext.getCmp(id);
    p.collapse();
    p.down('[type=close]').show();
};

DTG.View.expandPanel=function(id){
    var p=Ext.getCmp(id);
    p.expand();
    p.down('[type=close]').hide();
};

DTG.View.getHeight=function(id,val){
    var p=Ext.getCmp(id).getPosition()[1];
    return p-val;
};

if(!DTG.View.Msg){DTG.View.Msg={}}

DTG.View.Msg.info=function(title,message){
    Ext.MessageBox.show({title:title,msg:message,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.INFO});
};

DTG.View.Msg.question=function(title,message){
    Ext.MessageBox.show({title:title,msg:message,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.QUESTION,alwaysOnTop:true});
};

DTG.View.Msg.warning=function(title,message){
    Ext.MessageBox.show({title:title,msg:message,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.WARNING});
};

DTG.View.Msg.error=function(title,message){
    Ext.MessageBox.show({title:title,msg:message,buttons:Ext.MessageBox.OK,icon:Ext.MessageBox.ERROR});
};

DTG.View.toast=function(title,html){
    Ext.toast({title:title,html:html,align:'tr',iconCls:'fa fa-thumbs-up'});
};

DTG.View.viewportDestroy=function(){
    var v=Ext.getCmp('viewport-login-desktop');v.destroy();
};

DTG.View.updateStatusBar=function(texto){
    var sb=Ext.getCmp('status-bar-detalles');
    sb.update('<b><span style="color:#000;">'+texto+'</span></b>');
};

/* Catch Error from actions > Add, Update, Remove, findBy, findAll and others */
DTG.ERROR=function(error){
    if(error.message==="Validation error"){
        DTG.View.Msg.question('Atención', 'Estos datos ya existen en la <b>Base de Datos</b>, <b>VERIFÍQUELOS</b>.');
        console.log(error);
    } else {
        DTG.View.Msg.error('Error', error.toString());
        console.log(error);
    }
};

/* then OK from actions > Add, Update, Remove, findBy, findAll and others */
DTG.OK=function(win,store,action){
    if(store){
        store.reload();
    }
    if(action==='add'){
        DTG.View.toast('Creación OK', 'Operación realizada exitosamente.');
        win.reset();
    }else if(action==='update'){
        DTG.View.toast('Actualización OK', 'Operación realizada exitosamente.');
        win.close();
    }else{
        DTG.View.toast('Creación OK', 'Operación realizada exitosamente.');
        win.close();
    }
};

DTG.startTask=function(time, task){
    Ext.TaskManager.start({
        run: task,
        interval: 1000,
        duration: 1000 * (time - 1)
    });
};