var DTG=DTG||{};
if(!DTG.Lib){DTG.Lib={};}
if(!DTG.Data){DTG.Data={};}
if(!DTG.Model){DTG.Model={};}
if(!DTG.Repository){DTG.Repository={};}
/* Include */
DTG.Lib.Fs=require('fs');
DTG.Lib.Util=require('util');
DTG.Lib.Process=require('child_process');
DTG.Lib.Sequelize=require('sequelize');
DTG.GUI=require('nw.gui');
/* Open connection from DB */
if(!DTG.Sequelize) {
    var db_config = require('./config/parameters.json');
    DTG.Sequelize = new DTG.Lib.Sequelize(db_config.database, db_config.user, db_config.password, db_config.server);
}
/* Load JavaScript file by patch */
DTG.loadScript=function(path){
    if(DTG.Lib.Util.isArray(path)){
        path.forEach(function(p){
            load(p);
        });
    }else{
        load(path);
    }
    function load(p){
        var script=document.createElement('script');
        script.setAttribute("type","text/javascript");
        script.setAttribute("src", p);
        document.getElementsByTagName("head")[0].appendChild(script);
    }
};
/* Write html file into the DOM */
DTG.writeHtml=function(path, option){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", path, false);
    xhr.send();

    if(option==='html'){
        document.write(xhr.responseText);
    } else {
        return xhr.responseText;
    }
};
/* Load script */
DTG.loadScript("config/autoload.js");
/* Save Data */
if(!DTG.Data.TEMP){
    DTG.Data.TEMP = [];
}
DTG.Data.Path=require('path').resolve('.');