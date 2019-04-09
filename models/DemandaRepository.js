
if(!DTG.Repository.Demanda){DTG.Repository.Demanda={};}

DTG.Repository.Demanda.findByYear=function(year, store){

    var queryCantidadServicio = "(SELECT COUNT(demanda_servicio_identificacion.id) FROM demanda_servicio_identificacion INNER JOIN demanda_servicio_producto ON demanda_servicio_identificacion.demanda_servicio_producto_id = demanda_servicio_producto.id INNER JOIN servicio_producto ON servicio_producto.id = demanda_servicio_producto.servicio_producto_id WHERE demanda_servicio_producto.demanda_id = demanda.id AND servicio_producto.tipo LIKE '%%Servicio%%%%') AS cantidad_servicio",
        queryCantidadProducto = "(SELECT COUNT(demanda_servicio_identificacion.id) FROM demanda_servicio_identificacion INNER JOIN demanda_servicio_producto ON demanda_servicio_identificacion.demanda_servicio_producto_id = demanda_servicio_producto.id INNER JOIN servicio_producto ON servicio_producto.id = demanda_servicio_producto.servicio_producto_id WHERE demanda_servicio_producto.demanda_id = demanda.id AND servicio_producto.tipo LIKE '%%Producto%%%%') AS cantidad_producto",
        queryPeriodoGuerraIds = "(SELECT GROUP_CONCAT(id) FROM periodo_guerra INNER JOIN demanda_periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda_periodo_guerra.demanda_id = demanda.id) AS periodo_guerra_ids",
        queryPeriodosDeGuerra = "(SELECT GROUP_CONCAT(etapa) FROM periodo_guerra INNER JOIN demanda_periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda_periodo_guerra.demanda_id = demanda.id) AS periodo_guerra",
        queryDemanda = "SELECT demanda.id, fecha_solicitud, fecha_demanda, demanda.estado, empresa.acronimo, empresa.nombre AS empresa, empresa.id AS empresa_id, " + queryPeriodoGuerraIds + ", " + queryPeriodosDeGuerra + ", "+ queryCantidadServicio + ", "+ queryCantidadProducto +" FROM demanda INNER JOIN empresa ON empresa.id = demanda.empresa_id WHERE year = '"+year+"';",
        data = [];

    DTG.Sequelize.query(queryDemanda, {
        type: DTG.Sequelize.QueryTypes.SELECT
    }).then(function(demandas){
        demandas.forEach(function(demanda){
            DTG.Model.Demanda.findById(demanda.id).then(function(dem){
                dem.getPersonas({ include: [{ model: DTG.Model.TipoPersona }] }).then(function(personas){
                    /* Personas */
                    var solicitante = "", aprobado_por = "";
                    /* Save Persona By type */
                    personas.forEach(function(persona){
                        if (persona.TipoPersona.nombre.trim() === "Usuario"){
                            solicitante = persona.nombre +' '+ persona.apellidos;
                        }
                        if (persona.TipoPersona.nombre.trim() === "Trabajador"){
                            aprobado_por = persona.nombre +' '+ persona.apellidos;
                        }
                    });
                    data.push({
                        id: demanda.id,
                        fecha_solicitud: demanda.fecha_solicitud,
                        fecha_demanda: demanda.fecha_demanda,
                        acronimo: demanda.acronimo,
                        empresa: demanda.empresa,
                        empresa_id: demanda.empresa_id,
                        periodo_guerra: demanda.periodo_guerra,
                        periodo_guerra_ids: eval("["+ demanda.periodo_guerra_ids +"]"),
                        cantidad_servicio: demanda.cantidad_servicio,
                        cantidad_producto: demanda.cantidad_producto,
                        solicitante: solicitante,
                        aprobado_por: aprobado_por,
                        estado: demanda.estado
                    });
                    store.loadData(data);
                }).catch(function(err) { console.log(err); });
            }).catch(function(err) { console.log(err); });
        });
    });
};

/**
 * Load Data from DB and write html file for PDF generate.
 * @param path
 * @param year
 */
DTG.Repository.Demanda.loadAnexo3=function(path, year){
    /* Query */
    var query = 'SELECT sector.nombre,',
        query1 = ' (SELECT count(demanda_servicio_identificacion.identificacion) FROM demanda_servicio_identificacion INNER JOIN demanda_servicio_producto ON demanda_servicio_producto.id = demanda_servicio_identificacion.demanda_servicio_producto_id INNER JOIN servicio_producto ON servicio_producto.id = demanda_servicio_producto.servicio_producto_id INNER JOIN demanda ON demanda.id = demanda_servicio_producto.demanda_id INNER JOIN empresa ON empresa.id = demanda.empresa_id INNER JOIN organismo ON organismo.id = empresa.organismo_id INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id INNER JOIN periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda.year = \''+ year +'\' AND periodo_guerra.etapa LIKE \'%%Primera Etapa%%\' AND sector.id = organismo.sector_id AND servicio_producto.nombre ',
        query2 = ' (SELECT count(demanda_servicio_identificacion.identificacion) FROM demanda_servicio_identificacion INNER JOIN demanda_servicio_producto ON demanda_servicio_producto.id = demanda_servicio_identificacion.demanda_servicio_producto_id INNER JOIN servicio_producto ON servicio_producto.id = demanda_servicio_producto.servicio_producto_id INNER JOIN demanda ON demanda.id = demanda_servicio_producto.demanda_id INNER JOIN empresa ON empresa.id = demanda.empresa_id INNER JOIN organismo ON organismo.id = empresa.organismo_id INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id INNER JOIN periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda.year = \''+ year +'\' AND periodo_guerra.etapa LIKE \'%%Segunda Etapa%%\' AND sector.id = organismo.sector_id AND servicio_producto.nombre ';
    /* Primera Etapa */
    query += query1 +'LIKE \'%%Telefonía Básica%%\') AS telefoniaBasica1,';
    query += query1 +'LIKE \'%%Celular%%\') AS celular1,';
    query += query1 +'LIKE \'%%Servicio de Operadoras%%\') AS servicioOperadoras1,';
    query += query1 +'LIKE \'%%Estación Pública%%\') AS estacionPublica1,';
    query += query1 +'LIKE \'%%Línea Telefónica Directa%%\') AS lineaTelefonicaDirecta1,';
    query += query1 +'LIKE \'%%Correo Electrónico%%\') AS correoElectronico1,';
    query += query1 +'LIKE \'%%Línea Transmisión de Datos%%\') AS lineaTransmisionDatos1,';
    query += query1 +'LIKE \'%%Internet%%\') AS internet1,';
    query += query1 +'LIKE \'%%Pizarra%%\') AS pizarra1,';
    query += query1 +'LIKE \'%%Línea Directa Pizarra%%\') AS lineaDirectaPizarra1,';
    query += query1 +'<> \'Telefonía Básica\' AND servicio_producto.nombre <> \'Celular\' AND servicio_producto.nombre <> \'Servicio de Operadoras\' AND servicio_producto.nombre <> \'Estación Pública\' AND servicio_producto.nombre <> \'Línea Telefónica Directa\' AND servicio_producto.nombre <> \'Correo Electrónico\' AND servicio_producto.nombre <> \'Línea Transmisión de Datos\' AND servicio_producto.nombre <> \'Internet\' AND servicio_producto.nombre <> \'Pizarra\' AND servicio_producto.nombre <> \'Línea Directa Pizarra\') AS otros1,';
    query += '(SELECT count(demanda.estado) FROM demanda INNER JOIN empresa ON empresa.id = demanda.empresa_id INNER JOIN organismo ON organismo.id = empresa.organismo_id INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id INNER JOIN periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda.estado LIKE \'%%SATISFECHA%%\' AND demanda.year = \'' +year+ '\' AND organismo.sector_id = sector.id AND periodo_guerra.etapa LIKE \'%%Primera Etapa%%\') AS demandaSatisfecha1,';
    query += '(SELECT count(demanda.estado) FROM demanda INNER JOIN empresa ON empresa.id = demanda.empresa_id INNER JOIN organismo ON organismo.id = empresa.organismo_id INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id INNER JOIN periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda.estado LIKE \'%%PENDIENTE%%\' AND demanda.year = \'' +year+ '\' AND organismo.sector_id = sector.id AND periodo_guerra.etapa LIKE \'%%Primera Etapa%%\') AS demandaPendiente1,';
    /* Segunda Etapa */
    query += query2 +'LIKE \'%%Telefonía Básica%%\') AS telefoniaBasica2,';
    query += query2 +'LIKE \'%%Celular%%\') AS celular2,';
    query += query2 +'LIKE \'%%Servicio de Operadoras%%\') AS servicioOperadoras2,';
    query += query2 +'LIKE \'%%Estación Pública%%\') AS estacionPublica2,';
    query += query2 +'LIKE \'%%Línea Telefónica Directa%%\') AS lineaTelefonicaDirecta2,';
    query += query2 +'LIKE \'%%Correo Electrónico%%\') AS correoElectronico2,';
    query += query2 +'LIKE \'%%Línea Transmisión de Datos%%\') AS lineaTransmisionDatos2,';
    query += query2 +'LIKE \'%%Internet%%\') AS internet2,';
    query += query2 +'LIKE \'%%Pizarra%%\') AS pizarra2,';
    query += query2 +'LIKE \'%%Línea Directa Pizarra%%\') AS lineaDirectaPizarra2,';
    query += query2 +'<> \'Telefonía Básica\' AND servicio_producto.nombre <> \'Celular\' AND servicio_producto.nombre <> \'Servicio de Operadoras\' AND servicio_producto.nombre <> \'Estación Pública\' AND servicio_producto.nombre <> \'Línea Telefónica Directa\' AND servicio_producto.nombre <> \'Correo Electrónico\' AND servicio_producto.nombre <> \'Línea Transmisión de Datos\' AND servicio_producto.nombre <> \'Internet\' AND servicio_producto.nombre <> \'Pizarra\' AND servicio_producto.nombre <> \'Línea Directa Pizarra\') AS otros2,';
    query += '(SELECT count(demanda.estado) FROM demanda INNER JOIN empresa ON empresa.id = demanda.empresa_id INNER JOIN organismo ON organismo.id = empresa.organismo_id INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id INNER JOIN periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda.estado LIKE \'%%SATISFECHA%%\' AND demanda.year = \'' +year+ '\' AND organismo.sector_id = sector.id AND periodo_guerra.etapa LIKE \'%%Segunda Etapa%%\') AS demandaSatisfecha2,';
    query += '(SELECT count(demanda.estado) FROM demanda INNER JOIN empresa ON empresa.id = demanda.empresa_id INNER JOIN organismo ON organismo.id = empresa.organismo_id INNER JOIN demanda_periodo_guerra ON demanda.id = demanda_periodo_guerra.demanda_id INNER JOIN periodo_guerra ON periodo_guerra.id = demanda_periodo_guerra.periodo_guerra_id WHERE demanda.estado LIKE \'%%PENDIENTE%%\' AND demanda.year = \'' +year+ '\' AND organismo.sector_id = sector.id AND periodo_guerra.etapa LIKE \'%%Segunda Etapa%%\') AS demandaPendiente2 ';
    /* From Sector */
    query += 'from sector;';
    /* Eject Query */
    DTG.Sequelize.query(query, { type: DTG.Sequelize.QueryTypes.SELECT }).then(function(record){
        if (record.length > 0) {
            /* Code HTML */
            var html = DTG.writeHtml(path, 'string'),
                TBA1 = 0, CEL1 = 0, SOP1 = 0, EPU1 = 0, LDI1 = 0, COE1 = 0, LTD1 = 0, INT1 = 0, PIZ1 = 0, LDP1 = 0, OTR1 = 0,
                TBA2 = 0, CEL2 = 0, SOP2 = 0, EPU2 = 0, LDI2 = 0, COE2 = 0, LTD2 = 0, INT2 = 0, PIZ2 = 0, LDP2 = 0, OTR2 = 0,
                LAR1 = 0, DET1 = 0, ECO1 = 0, POB1 = 0, LAR2 = 0, DET2 = 0, ECO2 = 0, POB2 = 0, PEN1 = 0, PEN2 = 0, SAT1 = 0, SAT2 = 0;
            /* Update HTML */
            record.forEach(function (rec) {
                /* Primera Etapa de Guerra */
                switch (rec.nombre) {
                    case "Lucha Armada MININT MINFAR":
                        html = html.replace('{{TBA11}}', rec.telefoniaBasica1);
                        html = html.replace('{{CEL11}}', rec.celular1);
                        html = html.replace('{{SOP11}}', rec.servicioOperadoras1);
                        html = html.replace('{{EPU11}}', rec.estacionPublica1);
                        html = html.replace('{{LDI11}}', rec.lineaTelefonicaDirecta1);
                        html = html.replace('{{COE11}}', rec.correoElectronico1);
                        html = html.replace('{{LTD11}}', rec.lineaTransmisionDatos1);
                        html = html.replace('{{INT11}}', rec.internet1);
                        html = html.replace('{{PIZ11}}', rec.pizarra1);
                        html = html.replace('{{LDP11}}', rec.lineaDirectaPizarra1);
                        html = html.replace('{{OTR11}}', rec.otros1);
                        html = html.replace('{{SAT11}}', rec.demandaSatisfecha1);
                        html = html.replace('{{PEN11}}', rec.demandaPendiente1);
                        html = html.replace('{{POR11}}', (100 * rec.demandaSatisfecha1 / (rec.demandaPendiente1 + rec.demandaSatisfecha1)));
                        LAR1 = rec.telefoniaBasica1 + rec.celular1 + rec.servicioOperadoras1 + rec.estacionPublica1 + rec.lineaTelefonicaDirecta1 + rec.correoElectronico1 + rec.lineaTransmisionDatos1 + rec.internet1 + rec.pizarra1 + rec.lineaDirectaPizarra1 + rec.otros1;
                        /* 2 */
                        html = html.replace('{{TBA21}}', rec.telefoniaBasica2);
                        html = html.replace('{{CEL21}}', rec.celular2);
                        html = html.replace('{{SOP21}}', rec.servicioOperadoras2);
                        html = html.replace('{{EPU21}}', rec.estacionPublica2);
                        html = html.replace('{{LDI21}}', rec.lineaTelefonicaDirecta2);
                        html = html.replace('{{COE21}}', rec.correoElectronico2);
                        html = html.replace('{{LTD21}}', rec.lineaTransmisionDatos2);
                        html = html.replace('{{INT21}}', rec.internet2);
                        html = html.replace('{{PIZ21}}', rec.pizarra2);
                        html = html.replace('{{LDP21}}', rec.lineaDirectaPizarra2);
                        html = html.replace('{{OTR21}}', rec.otros2);
                        html = html.replace('{{SAT21}}', rec.demandaSatisfecha2);
                        html = html.replace('{{PEN21}}', rec.demandaPendiente2);
                        html = html.replace('{{POR21}}', (100 * rec.demandaSatisfecha2 / (rec.demandaPendiente2 + rec.demandaSatisfecha2)));
                        LAR2 = rec.telefoniaBasica2 + rec.celular2 + rec.servicioOperadoras2 + rec.estacionPublica2 + rec.lineaTelefonicaDirecta2 + rec.correoElectronico2 + rec.lineaTransmisionDatos2 + rec.internet2 + rec.pizarra2 + rec.lineaDirectaPizarra2 + rec.otros2;
                        break;
                    case "Defensa Territorial":
                        html = html.replace('{{TBA12}}', rec.telefoniaBasica1);
                        html = html.replace('{{CEL12}}', rec.celular1);
                        html = html.replace('{{SOP12}}', rec.servicioOperadoras1);
                        html = html.replace('{{EPU12}}', rec.estacionPublica1);
                        html = html.replace('{{LDI12}}', rec.lineaTelefonicaDirecta1);
                        html = html.replace('{{COE12}}', rec.correoElectronico1);
                        html = html.replace('{{LTD12}}', rec.lineaTransmisionDatos1);
                        html = html.replace('{{INT12}}', rec.internet1);
                        html = html.replace('{{PIZ12}}', rec.pizarra1);
                        html = html.replace('{{LDP12}}', rec.lineaDirectaPizarra1);
                        html = html.replace('{{OTR12}}', rec.otros1);
                        html = html.replace('{{SAT12}}', rec.demandaSatisfecha1);
                        html = html.replace('{{PEN12}}', rec.demandaPendiente1);
                        html = html.replace('{{POR12}}', (100 * rec.demandaSatisfecha1 / (rec.demandaPendiente1 + rec.demandaSatisfecha1)));
                        DET1 = rec.telefoniaBasica1 + rec.celular1 + rec.servicioOperadoras1 + rec.estacionPublica1 + rec.lineaTelefonicaDirecta1 + rec.correoElectronico1 + rec.lineaTransmisionDatos1 + rec.internet1 + rec.pizarra1 + rec.lineaDirectaPizarra1 + rec.otros1;
                        /* 2 */
                        html = html.replace('{{TBA22}}', rec.telefoniaBasica2);
                        html = html.replace('{{CEL22}}', rec.celular2);
                        html = html.replace('{{SOP22}}', rec.servicioOperadoras2);
                        html = html.replace('{{EPU22}}', rec.estacionPublica2);
                        html = html.replace('{{LDI22}}', rec.lineaTelefonicaDirecta2);
                        html = html.replace('{{COE22}}', rec.correoElectronico2);
                        html = html.replace('{{LTD22}}', rec.lineaTransmisionDatos2);
                        html = html.replace('{{INT22}}', rec.internet2);
                        html = html.replace('{{PIZ22}}', rec.pizarra2);
                        html = html.replace('{{LDP22}}', rec.lineaDirectaPizarra2);
                        html = html.replace('{{OTR22}}', rec.otros2);
                        html = html.replace('{{SAT22}}', rec.demandaSatisfecha2);
                        html = html.replace('{{PEN22}}', rec.demandaPendiente2);
                        html = html.replace('{{POR22}}', (100 * rec.demandaSatisfecha2 / (rec.demandaPendiente2 + rec.demandaSatisfecha2)));
                        DET2 = rec.telefoniaBasica2 + rec.celular2 + rec.servicioOperadoras2 + rec.estacionPublica2 + rec.lineaTelefonicaDirecta2 + rec.correoElectronico2 + rec.lineaTransmisionDatos2 + rec.internet2 + rec.pizarra2 + rec.lineaDirectaPizarra2 + rec.otros2;
                        break;
                    case "Economía":
                        html = html.replace('{{TBA13}}', rec.telefoniaBasica1);
                        html = html.replace('{{CEL13}}', rec.celular1);
                        html = html.replace('{{SOP13}}', rec.servicioOperadoras1);
                        html = html.replace('{{EPU13}}', rec.estacionPublica1);
                        html = html.replace('{{LDI13}}', rec.lineaTelefonicaDirecta1);
                        html = html.replace('{{COE13}}', rec.correoElectronico1);
                        html = html.replace('{{LTD13}}', rec.lineaTransmisionDatos1);
                        html = html.replace('{{INT13}}', rec.internet1);
                        html = html.replace('{{PIZ13}}', rec.pizarra1);
                        html = html.replace('{{LDP13}}', rec.lineaDirectaPizarra1);
                        html = html.replace('{{OTR13}}', rec.otros1);
                        html = html.replace('{{SAT13}}', rec.demandaSatisfecha1);
                        html = html.replace('{{PEN13}}', rec.demandaPendiente1);
                        html = html.replace('{{POR13}}', (100 * rec.demandaSatisfecha1 / (rec.demandaPendiente1 + rec.demandaSatisfecha1)));
                        ECO1 = rec.telefoniaBasica1 + rec.celular1 + rec.servicioOperadoras1 + rec.estacionPublica1 + rec.lineaTelefonicaDirecta1 + rec.correoElectronico1 + rec.lineaTransmisionDatos1 + rec.internet1 + rec.pizarra1 + rec.lineaDirectaPizarra1 + rec.otros1;
                        /* 2 */
                        html = html.replace('{{TBA23}}', rec.telefoniaBasica2);
                        html = html.replace('{{CEL23}}', rec.celular2);
                        html = html.replace('{{SOP23}}', rec.servicioOperadoras2);
                        html = html.replace('{{EPU23}}', rec.estacionPublica2);
                        html = html.replace('{{LDI23}}', rec.lineaTelefonicaDirecta2);
                        html = html.replace('{{COE23}}', rec.correoElectronico2);
                        html = html.replace('{{LTD23}}', rec.lineaTransmisionDatos2);
                        html = html.replace('{{INT23}}', rec.internet2);
                        html = html.replace('{{PIZ23}}', rec.pizarra2);
                        html = html.replace('{{LDP23}}', rec.lineaDirectaPizarra2);
                        html = html.replace('{{OTR23}}', rec.otros2);
                        html = html.replace('{{SAT23}}', rec.demandaSatisfecha2);
                        html = html.replace('{{PEN23}}', rec.demandaPendiente2);
                        html = html.replace('{{POR23}}', (100 * rec.demandaSatisfecha2 / (rec.demandaPendiente2 + rec.demandaSatisfecha2)));
                        ECO2 = rec.telefoniaBasica2 + rec.celular2 + rec.servicioOperadoras2 + rec.estacionPublica2 + rec.lineaTelefonicaDirecta2 + rec.correoElectronico2 + rec.lineaTransmisionDatos2 + rec.internet2 + rec.pizarra2 + rec.lineaDirectaPizarra2 + rec.otros2;
                        break;
                    case "Población":
                        html = html.replace('{{TBA14}}', rec.telefoniaBasica1);
                        html = html.replace('{{CEL14}}', rec.celular1);
                        html = html.replace('{{SOP14}}', rec.servicioOperadoras1);
                        html = html.replace('{{EPU14}}', rec.estacionPublica1);
                        html = html.replace('{{LDI14}}', rec.lineaTelefonicaDirecta1);
                        html = html.replace('{{COE14}}', rec.correoElectronico1);
                        html = html.replace('{{LTD14}}', rec.lineaTransmisionDatos1);
                        html = html.replace('{{INT14}}', rec.internet1);
                        html = html.replace('{{PIZ14}}', rec.pizarra1);
                        html = html.replace('{{LDP14}}', rec.lineaDirectaPizarra1);
                        html = html.replace('{{OTR14}}', rec.otros1);
                        html = html.replace('{{SAT14}}', rec.demandaSatisfecha1);
                        html = html.replace('{{PEN14}}', rec.demandaPendiente1);
                        html = html.replace('{{POR14}}', (100 * rec.demandaSatisfecha1 / (rec.demandaPendiente1 + rec.demandaSatisfecha1)));
                        POB1 = rec.telefoniaBasica1 + rec.celular1 + rec.servicioOperadoras1 + rec.estacionPublica1 + rec.lineaTelefonicaDirecta1 + rec.correoElectronico1 + rec.lineaTransmisionDatos1 + rec.internet1 + rec.pizarra1 + rec.lineaDirectaPizarra1 + rec.otros1;
                        /* 2 */
                        html = html.replace('{{TBA24}}', rec.telefoniaBasica2);
                        html = html.replace('{{CEL24}}', rec.celular2);
                        html = html.replace('{{SOP24}}', rec.servicioOperadoras2);
                        html = html.replace('{{EPU24}}', rec.estacionPublica2);
                        html = html.replace('{{LDI24}}', rec.lineaTelefonicaDirecta2);
                        html = html.replace('{{COE24}}', rec.correoElectronico2);
                        html = html.replace('{{LTD24}}', rec.lineaTransmisionDatos2);
                        html = html.replace('{{INT24}}', rec.internet2);
                        html = html.replace('{{PIZ24}}', rec.pizarra2);
                        html = html.replace('{{LDP24}}', rec.lineaDirectaPizarra2);
                        html = html.replace('{{OTR24}}', rec.otros2);
                        html = html.replace('{{SAT24}}', rec.demandaSatisfecha2);
                        html = html.replace('{{PEN24}}', rec.demandaPendiente2);
                        html = html.replace('{{POR24}}', (100 * rec.demandaSatisfecha2 / (rec.demandaPendiente2 + rec.demandaSatisfecha2)));
                        POB2 = rec.telefoniaBasica2 + rec.celular2 + rec.servicioOperadoras2 + rec.estacionPublica2 + rec.lineaTelefonicaDirecta2 + rec.correoElectronico2 + rec.lineaTransmisionDatos2 + rec.internet2 + rec.pizarra2 + rec.lineaDirectaPizarra2 + rec.otros2;
                        break;
                }
                /*TOTAL 1*/
                TBA1 += rec.telefoniaBasica1, CEL1 += rec.celular1, SOP1 += rec.servicioOperadoras1, EPU1 += rec.estacionPublica1, LDI1 += rec.lineaTelefonicaDirecta1, COE1 += rec.correoElectronico1, LTD1 += rec.lineaTransmisionDatos1, INT1 += rec.internet1, PIZ1 += rec.pizarra1, LDP1 += rec.lineaDirectaPizarra1, OTR1 += rec.otros1;
                PEN1 += rec.demandaPendiente1; SAT1 += rec.demandaSatisfecha1;
                /*TOTAL 2*/
                TBA2 += rec.telefoniaBasica2, CEL2 += rec.celular2, SOP2 += rec.servicioOperadoras2, EPU2 += rec.estacionPublica2, LDI2 += rec.lineaTelefonicaDirecta2, COE2 += rec.correoElectronico2, LTD2 += rec.lineaTransmisionDatos2, INT2 += rec.internet2, PIZ2 += rec.pizarra2, LDP2 += rec.lineaDirectaPizarra2, OTR2 += rec.otros2;
                PEN2 += rec.demandaPendiente2; SAT2 += rec.demandaSatisfecha2;
            });
            /* ROW TOTAL 1 */
            html = html.replace('{{TBA15}}', TBA1);
            html = html.replace('{{CEL15}}', CEL1);
            html = html.replace('{{SOP15}}', SOP1);
            html = html.replace('{{EPU15}}', EPU1);
            html = html.replace('{{LDI15}}', LDI1);
            html = html.replace('{{COE15}}', CEL1);
            html = html.replace('{{LTD15}}', LTD1);
            html = html.replace('{{INT15}}', INT1);
            html = html.replace('{{PIZ15}}', PIZ1);
            html = html.replace('{{LDP15}}', LDP1);
            html = html.replace('{{OTR15}}', OTR1);
            html = html.replace('{{SAT15}}', SAT1);
            html = html.replace('{{PEN15}}', PEN1);
            html = html.replace('{{POR15}}', (100 * SAT1 / (PEN1 + SAT1)).toPrecision(3));
            /* ROW TOTAL 2 */
            html = html.replace('{{TBA25}}', TBA2);
            html = html.replace('{{CEL25}}', CEL2);
            html = html.replace('{{SOP25}}', SOP2);
            html = html.replace('{{EPU25}}', EPU2);
            html = html.replace('{{LDI25}}', LDI2);
            html = html.replace('{{COE25}}', CEL2);
            html = html.replace('{{LTD25}}', LTD2);
            html = html.replace('{{INT25}}', INT2);
            html = html.replace('{{PIZ25}}', PIZ2);
            html = html.replace('{{LDP25}}', LDP2);
            html = html.replace('{{OTR25}}', OTR2);
            html = html.replace('{{SAT25}}', SAT2);
            html = html.replace('{{PEN25}}', PEN2);
            html = html.replace('{{POR25}}', (100 * SAT2 / (PEN2 + SAT2)).toPrecision(3));
            /* COLUMN TOTAL1 */
            html = html.replace('{{DET11}}', LAR1);
            html = html.replace('{{DET12}}', DET1);
            html = html.replace('{{DET13}}', ECO1);
            html = html.replace('{{DET14}}', POB1);
            html = html.replace('{{DET15}}', (LAR1 + DET1 +ECO1 + POB1));
            /* COLUMN TOTAL2 */
            html = html.replace('{{DET21}}', LAR2);
            html = html.replace('{{DET22}}', DET2);
            html = html.replace('{{DET23}}', ECO2);
            html = html.replace('{{DET24}}', POB2);
            html = html.replace('{{DET25}}', (LAR2 + DET2 +ECO2 + POB2));
            /* Fecha */
            var date = new Date();
            html = html.replace('{{FECHA}}', date.getDate() +'/'+ (parseInt(date.getMonth())+1) +'/'+ date.getFullYear());
            /* Write HTML file */
            DTG.Lib.Fs.writeFile(DTG.Data.Path+'/reports/ModeloResumenAnexo3.html', html);
        } else {
            /* Write HTML file */
            DTG.Lib.Fs.writeFile(DTG.Data.Path+'/reports/ModeloResumenAnexo3.html', '<span style="color: #2872dd; text-align: center"><h1>No se ha realizado ninguna demanda en el año '+ year +'...</h1></span>');
        }
    });
};

DTG.Repository.Demanda.loadAnexo3('reports/BASE/ModeloResumenAnexo3.html', 2016);
