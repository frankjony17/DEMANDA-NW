/* Load native UI library and declarations */
//var DTG=DTG||{};if(!DTG.lib){DTG.Lib={};}DTG.Lib.Os=require('os');DTG.Lib.Fs=require('fs');DTG.Lib.Gui=require('nw.gui');DTG.Lib.Util=require('others');DTG.Lib.Path=require('path');DTG.Lib.Crypto=require('crypto');DTG.Lib.Sequelize=require('sequelize');DTG.Lib.Bcrypt=require('bcryptjs');
///*Declaraciones*/
//if(!DTG.Security){DTG.Security={}}; // Save many data.
//if(!DTG.Data){DTG.Data={}}; // Save many data.
//if(!DTG.Util){DTG.Util={}}; // Save methods utils.
//DTG.Data.error=0; // Use for count the ron intent on login.
//if(!DTG.Data.Model){DTG.Data.Model={}}; // The Model for entities.
//DTG.Data.Path=DTG.Lib.Path.resolve('.'); // Get absolute path from DTG.
//DTG.Data.So=DTG.Lib.Os.platform(); // Get  the operating system platform.
//DTG.Window=DTG.Lib.Gui.Window.get(); // Get the current window.
///* On close windows */
//DTG.Window.on('close',function(){DTG.Security.encrypting();this.close(true);});
///* Decrypting DB */
//DTG.Lib.Fs.stat(DTG.Lib.Path.normalize(DTG.Data.Path+'/app/data/db/db.etecsa_demanda'),function (err, stats){if(!err){if(stats.isFile()){var aes_256c=DTG.Lib.Crypto.createDecipher('aes-256-cbc',new Buffer('B*JN/Xk28.g26P;m27A**jPT2'));var r_stream=DTG.Lib.Fs.createReadStream(DTG.Lib.Path.normalize(DTG.Data.Path+'/app/data/db/db.etecsa_demanda'));var w_stream=DTG.Lib.Fs.createWriteStream(DTG.Lib.Path.normalize(DTG.Data.Path+'/app/data/db/etecsa_demanda.db'));r_stream.pipe(aes_256c).pipe(w_stream).on('finish',function(){DTG.Lib.Fs.unlink(DTG.Lib.Path.normalize(DTG.Data.Path+'/app/data/db/db.etecsa_demanda'));});}}});
/* Open connection from DB */
//if(!DTG.DB){DTG.DB=new DTG.Lib.Sequelize('sqlite://devusr:devusr/app/data/db/etecsa_demanda.db');}

//function loadScript(url) {
//    var fileref=document.createElement('script');
//    fileref.setAttribute("type","text/javascript");
//    fileref.setAttribute("src", url);
//
//    document.getElementsByTagName("head")[0].appendChild(fileref);
//}
//
//loadScript("config/config.js");
//loadScript("views/app.js") ;