/**
 * Create PDF from file html
 */
DTG.pdf=function(pageConfig){
    var exec = DTG.Lib.Process.exec,
        command = DTG.Data.Path +'/node_modules/wkhtmltopdf/bin/wkhtmltopdf.exe';

    console.log(pageConfig.margin.top);
    console.log(pageConfig.margin.left);
    console.log(pageConfig.margin.right);
    console.log(pageConfig.margin.bottom);

    command += ' --orientation '+ pageConfig.orientation; // Landscape
    command += ' --page-size '+ pageConfig.pageSize; // Letter
    command += ' --margin-top '+ pageConfig.margin.top; // left
    command += ' --margin-left '+ pageConfig.margin.left; // right
    command += ' --margin-right '+ pageConfig.margin.right; // bottom
    command += ' --margin-bottom '+ pageConfig.margin.bottom; // Letter
    command += ' --title '+ pageConfig.title;
    command += ' --encoding UTF-8';
    command += ' '+ DTG.Data.Path + '/reports/'+ pageConfig.title +'.html'; //'/reports/*.html';
    command += ' '+ DTG.Data.Path + '/reports/'+ pageConfig.title +'.pdf';
    /* command execute in shell */
    exec(command, function (error, stdout, stderr) {
        if (error !== null) {
            console.log('exec error: ' + error);
            console.log(stderr);
        } else {
            console.log(stdout);
            DTG.GUI.Shell.openExternal(DTG.Data.Path + '/reports/'+ pageConfig.title +'.pdf');
        }
    });
};