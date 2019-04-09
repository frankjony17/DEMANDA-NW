
Ext.define('DTG.controller.DemandaFiltersController', {
    extend: 'Ext.app.Controller',

    control: {
        'filtro-demanda-form-windows': {
            expand: "onExpand",
            collapse: "onCollapse",
            beforerender: "onBeforeRender"
        },
        'filtro-demanda-form-windows [xtype=tagfield]': {
            change: "onTagChange"
        }
    },

    onBeforeRender: function (win)
    {
        this.win = win;
    },
    onCollapse: function ()
    {
        this.height = this.win.getHeight();
        this.win.setY(DTG.View.getHeight('south-panel-id',(this.height+3)));
    },
    onExpand: function ()
    {
        this.win.setY(DTG.View.getHeight('south-panel-id',this.win.getHeight()+3));
    },

    onTagChange: function (tag, newValue, oldValue)
    {
        if(oldValue.length > 0) {
            var win = tag.up('window'), data = [];
            win.tagData.forEach(function (el) {
                newValue.forEach(function (v) {
                    if (el.id === v) {
                        data.push(el);
                    }
                });
            });
            win.tagData = data;
            win.tagStore.loadData(win.tagData);
        }
    }
});