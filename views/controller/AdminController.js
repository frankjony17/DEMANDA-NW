
Ext.define('DTG.controller.AdminController', {
    extend: 'Ext.app.Controller',

    control: {
        'admin-viewport-desktop [text=Usuarios]': {
            click: "showUserGrid"
        },
        'admin-viewport-desktop [iconCls=fa fa-power-off]': {
            click: "onLogout"
        },
        // Grid.
        'user-grid': {
            resize: "onResize",
            afterrender: "onAfterRender",
            celldblclick: "celldblclick",
            itemcontextmenu: "contextMenu"
        },
        'user-grid [text=Adicionar]': {
            click: "showUserWindows"
        },
        'user-grid [text=Eliminar]': {
            click: "onRemoveUser"
        },
        // Form user.
        'user-form [text=Salvar]': {
            click: "onAddUser"
        },
        'user-edit-form [text=Editar]': {
            click: "editUser"
        },
        // Form Password.
        'password-form [text=Salvar]': {
            click: "changePassword"
        },
        // Login Viewport.
        '#login-viewport-center-panel': {
            resize: "onResizeLoginWindows"
        },
        'form-login': {
            afterrender: "onAfterRenderLoginForm"
        },
        'form-login [name=login-button]': {
            click: "onLoginClick"
        },
        '#login-textfield-usuario': {
            specialkey: "specialkeyUsuarioText"
        },
        '#login-textfield-password': {
            specialkey: "specialkeyPasswordText"
        }
    },

    onLogout: function ()
    {
        DTG.Window.reload();
    },
    showUserGrid: function ()
    {   // Add component to center panel.
        DTG.View.add(Ext.create('DTG.view.admin.UserGrid'));
        // Add title to center panel.
        DTG.View.setTitlePanel('admin-tab-panel', '<b>Gestionar > Usuarios</b>');
        // Collapse panel by ID.
        DTG.View.collapsePanel('admin-tab-panel');
        // Update StatusBar.
        DTG.View.updateStatusBar('Gestionar > Usuarios');
    },
    onResize: function (grid)
    {
        grid.setHeight(DTG.View.getHeight('south-panel-id', 49));
    },
    onAfterRender: function (grid)
    {
        this.grid = grid;
        this.store = grid.getStore();
    },
    loadStore: function ()
    {
        this.store.load();
    },
    celldblclick: function (view, td, cellIndex, record, tr, rowIndex)
    {
        var win = Ext.create('DTG.view.admin.UserEditForm'),
            form = win.down('form');
        form.loadRecord(record);
        win.show();
    },
    contextMenu: function (view, record, item, index, e, eOpts)
    {
        var me = this, menu = Ext.create('Ext.menu.Menu', {
            items: [{
                text: 'Cambiar clave <b>(Key)</b>',
                tooltip: 'Clave que se genera a partir del Hardware de la PC.',
                icon: 'app/resources/images/key.png',
                store: me.store,
                userId: record.id,
                handler: me.onChangeKey
            },'-',{
                text: 'Cambiar <b>contraseña</b>',
                icon: 'app/resources/images/pass.png',
                userId: record.id,
                handler: me.onChangePassword
            }]
        });
        menu.showAt(e.getXY())
    },
    onChangeKey: function (item)
    {
        DTG.Security.changeKey(item.userId, item.store);
    },
    onChangePassword: function (item)
    {
        Ext.create('DTG.view.admin.PasswordForm', { userId: item.userId });
    },
    changePassword: function (btn)
    {
        var win = btn.up('window'), form = win.down('form'), record = form.getValues();

        if (this.isValidUserForm(form, record)) {
            DTG.Security.changePassword([DTG.Lib.bcrypt.hashSync(record['password1'], 8), win.userId], this.store);
            win.close();
        }
    },
    editUser: function (btn)
    {
        var win = btn.up('window'), form = win.down('form'), record = form.getValues();

        if (form.getForm().isValid()) {
            DTG.Security.update(record, this.store);
            win.close();
        } else {
            DTG.View.Msg.question('Atención', '<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.');
        }
    },
    showUserWindows: function ()
    {
        Ext.create('DTG.view.admin.UserForm');
    },
    onAddUser: function (btn)
    {
        var win = btn.up('window'), form = win.down('form'), record = form.getValues();

        if (this.isValidUserForm(form, record))
        {
            var userModel = new DTG.Data.Model.User();

            userModel.setUsername(record['username']);
            userModel.setFullName(record['fullname']);
            userModel.setPassword(DTG.Lib.Bcrypt.hashSync(record['password1'], 8));

            DTG.Security.create(userModel, this.store);
            win.close();
        }
    },
    isValidUserForm: function (form, record)
    {
        var pass1 = form.down('[name=password1]'), pass2 = form.down('[name=password2]');

        if (form.getForm().isValid()) {
            if (record['password1'] !==  record['password2']) {
                pass1.setValue();
                pass2.setValue();
                DTG.View.Msg.error('Las contraseñas no coinciden', 'Vuelva a escribir las contraseñas en los dos cuadros de texto.');
            } else {
                return true;
            }
        } else {
            DTG.View.Msg.question('Atención', '<b><span style="color:red;">Formulario no válido</span></b>, verifique las casillas en <b><span style="color:red;">rojo</span></b>.');
        }
    },
    onRemoveUser: function ()
    {
        var me = this;

        if (me.grid.selModel.getCount() === 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar el registro seleccionado?', me.removeUser, me);
        } else if (me.grid.selModel.getCount() > 1) {
            Ext.MessageBox.confirm('Confirmación', 'Desea eliminar los registros seleccionados?', me.removeUser, me);
        } else {
            DTG.View.Msg.question('Atención', 'Seleccione el o los registro que desea eliminar.');
        }
    },
    removeUser: function (confirm)
    {
        var me = this;

        if (confirm === 'yes')
        {
            Ext.Array.each(me.grid.selModel.getSelection(), function (row)
            {
                if (row.get('username') !== 'admin') {
                    DTG.Security.remove(row.get('id'));
                } else {
                    DTG.View.Msg.question('Atención', 'El usuario <b>"admin" > (Administrador)</b> no puede ser eliminado por usted.<br>Consulte al administrador del sitema: <b>frank.ricardo@etecsa.cu</b>');
                }

            });
            me.loadStore();
        }
    },
    onAfterRenderLoginForm: function (win)
    {
        this.loginForm = win.down('form');
        this.loginWindow = win;
    },
    onResizeLoginWindows: function (centerPanel, width)
    {
        this.loginWindow.setPosition((width/2)-(this.loginWindow.getWidth()/2), 200);
    },
    onLoginClick: function ()
    {
        if (DTG.Data.error === 3) {
            var date = new Date(), date = date.getHours() +':'+ date.getMinutes();
            DTG.Lib.Fs.writeFile(DTG.Data.Path +'/app/data/db/time.close', date);
            DTG.Window.close();
        }
        if (this.loginForm.isValid())
        {
            var fieldUser = this.loginForm.down('[fieldLabel=Usuario]'),
                fieldPass = this.loginForm.down('[inputType=password]');
            DTG.Security.check(fieldUser, fieldPass);
        } else {
            DTG.View.Msg.error('Formulario no válido', 'Verifique las casillas en <b><span style="color:red;"><u>rojo</u>.</span></b>');
        }
    },
    specialkeyUsuarioText: function (field, e)
    {
        if (e.getKey() === e.ENTER)
        {
            var pass = Ext.getCmp('login-textfield-password');
            pass.focus(50, true);
        }
    },
    specialkeyPasswordText: function (field, e)
    {
        if (e.getKey() === e.ENTER)
        {
            this.onLoginClick();
        }
    }
});
