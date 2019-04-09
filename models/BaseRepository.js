
if(!DTG.Repository.Base){DTG.Repository.Base={};}

DTG.Repository.Base.addSector=function(store){

    var sectoress = [ 'Lucha Armada MININT MINFAR', 'Defensa Territorial', 'Economía', 'Población' ];
    var dataStore = [];

    sectoress.forEach(function (sector) {
        DTG.Model.Sector.create({
            nombre: sector,
            descripcion: sector
        });
        dataStore.push({nombre: sector, descripcion: sector})
    });
    store.loadData(dataStore);
};

DTG.Repository.Base.addServicioProducto=function(store){

    var servicios = ['Telefonía Básica', 'Celular', 'Servicio de Operadoras', 'Estación Pública', 'Línea Telefónica Directa', 'Correo Electrónico', 'Línea Transmisión de Datos', 'Internet', 'Pizarra', 'Línea Directa Pizarra'];
    var dataStore = [];

    servicios.forEach(function (servicio) {
        DTG.Model.ServicioProducto.create({
            nombre: servicio,
            descripcion: servicio,
            tipo: 'Servicio'
        });
        dataStore.push({nombre: servicio, descripcion: servicio})
    });
    store.loadData(dataStore);
};

DTG.Repository.Base.addTipoPersona=function(store){

    var tipopersona = ['Usuario', 'Trabajador'];
    var dataStore = [];

    tipopersona.forEach(function (tipo) {
        DTG.Model.TipoPersona.create({
            nombre: tipo,
            descripcion: tipo === 'Usuario' ? 'Usuario que demanda servicios para el tiempo d guerra': 'Trabajador de ETECSA'
        });
        dataStore.push({nombre: tipo, descripcion: tipo})
    });
    store.loadData(dataStore);
};

DTG.Repository.Base.addPeriodoGuerra=function(store){

    var dataStore = [], descripcion = '';

    ['Primera Etapa', 'Segunda Etapa', 'Tercera Etapa'].forEach(function (periodo) {

        if (periodo === 'Primera Etapa') {
            descripcion = 'Primera Etapa y ALGO MÁS'
        }
        if (periodo === 'Segunda Etapa') {
            descripcion = 'Segunda Etapa y ALGO MÁS'
        }
        if (periodo === 'Tercera Etapa') {
            descripcion = 'Tercera Etapa y ALGO MÁS'
        }
        DTG.Model.PeriodoGuerra.create({
            etapa: periodo,
            descripcion: descripcion
        });
        dataStore.push({ etapa: periodo, descripcion: descripcion })
    });
    store.loadData(dataStore);
};
